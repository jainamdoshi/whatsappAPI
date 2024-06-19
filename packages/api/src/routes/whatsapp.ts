import { Request, Response, Router } from 'express';
import { WHATSAPP_VERIFY_TOKEN } from '../config/init';
import { parseNewIncomingMessage, sendMessageToContacts } from '../lib/messages';
import { IncomingMessage } from '../model/db/schema/incomingMessages';
import { NewOutgoingMessage } from '../model/db/schema/outgoingMessages';
import { WhatsAppEventNotification } from '../model/eventNotification';
import { io } from '../websocket';

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

async function eventNotification(req: Request<any, any, WhatsAppEventNotification>, res: Response) {
	const events = req.body;
	const entries = events.entry;
	console.log(JSON.stringify(entries));

	for (const entry of entries) {
		for (const change of entry.changes) {
			if (change.field != 'messages') {
				console.error('Invalid field');
				continue;
			}

			for (const message of change.value.messages || []) {
				const newIncomingMessage = (await parseNewIncomingMessage(message)) as IncomingMessage;
				io.emit(`newIncomingMessages-${newIncomingMessage.fromContactId}`, {
					...newIncomingMessage,
					type: 'incoming'
				});
			}
		}
	}
	return res.status(200).send('EVENT_RECEIVED');
}

async function sendMessage(
	req: Request<any, any, { phoneNumbers: string[]; templateName: string }>,
	res: Response<NewOutgoingMessage | string>
) {
	const phoneNumbers = req.body.phoneNumbers || [];
	const templateName = req.body.templateName || '';

	console.log(phoneNumbers, templateName);

	try {
		const result = await sendMessageToContacts(phoneNumbers, templateName);
	} catch (error) {
		console.log(error);
		return res.status(500).send('Error sending message');
	}

	return res.status(200).send('Message sent');
}

export default whatsAppRouter;
