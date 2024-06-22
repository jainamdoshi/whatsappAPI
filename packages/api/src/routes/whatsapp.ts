import { Request, Response, Router } from 'express';
import { WHATSAPP_VERIFY_TOKEN } from '../config/init';
import { parseNewIncomingMessage, sendTemplateMessageToContacts } from '../lib/messages';
import { IncomingMessage } from '../model/db/schema/incomingMessages';
import { NewOutgoingMessage } from '../model/db/schema/outgoingMessages';
import { TWhatsAppEventNotification, WhatsAppEventNotification } from '../model/eventNotification';
import { io } from '../websocket';
import { getSenderContacts } from '../model/senderContacts';
import { getContacts } from '../model/contacts';

const whatsAppRouter = Router();

whatsAppRouter.get('/', verifyingRequest);
whatsAppRouter.post('/', eventNotification);
whatsAppRouter.post('/send', sendMessage);

async function verifyingRequest(req: Request, res: Response) {
	const mode = req.query['hub.mode'];
	const challenge = req.query['hub.challenge'];
	const token = req.query['hub.verify_token'];

	if (mode == 'subscribe' && token == WHATSAPP_VERIFY_TOKEN) {
		return res.status(200).send(challenge);
	}

	return res.status(403).send('Forbidden');
}

async function eventNotification(req: Request<any, any, TWhatsAppEventNotification>, res: Response) {
	const events = new WhatsAppEventNotification(req.body.entry);
	const entries = events.entry;

	for (const entry of entries) {
		for (const change of entry.changes) {
			if (change.field != 'messages') {
				console.error('Invalid field');
				continue;
			}

			const metadata = change.value.metadata;

			for (const message of change.value.messages || []) {
				const newIncomingMessage = (await parseNewIncomingMessage(message, metadata)) as IncomingMessage;

				if (newIncomingMessage) {
					io.emit(
						`newIncomingMessages-${newIncomingMessage.toContactId}-${newIncomingMessage.fromContactId}`,
						{
							...newIncomingMessage,
							type: 'incoming'
						}
					);
				}
			}
		}
	}
	return res.status(200).send('EVENT_RECEIVED');
}

async function sendMessage(
	req: Request<any, any, { senderContactId: string; phoneNumbers: string[]; templateName: string }>,
	res: Response<NewOutgoingMessage | string>
) {
	if (
		!req.body.senderContactId ||
		!req.body.phoneNumbers ||
		!req.body.phoneNumbers.length ||
		!req.body.templateName
	) {
		return res.status(400).send('Invalid request');
	}

	const contacts = await Promise.all([
		getSenderContacts({ filter: { id: [parseInt(req.body.senderContactId)] } }),
		getContacts({ filter: { id: req.body.phoneNumbers.map((number) => parseInt(number)) } })
	]);

	const templateName = req.body.templateName;

	try {
		await sendTemplateMessageToContacts(contacts[0][0], contacts[1], templateName);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Error sending message');
	}

	return res.status(200).send('Message sent');
}

export default whatsAppRouter;
