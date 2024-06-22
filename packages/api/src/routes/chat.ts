import { Request, Response, Router } from 'express';
import { mergeIncomingAndOutgoingMessages, sendTextMessage } from '../lib/messages';
import { getChatContacts, getContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { OutgoingMessage } from '../model/db/schema/outgoingMessages';
import { addOutgoingMessage, getIncomingMessages, getOutgoingMessages, Message } from '../model/messages';
import { getSenderContacts } from '../model/senderContacts';

const chatRouter = Router();
chatRouter.get('/contacts/:senderContactId', getContactsHandler);
chatRouter.get('/messages/:senderContactId/:contactId', getMessagesHandler);
chatRouter.post('/messages/:senderContactId/:contactId', sendMessageHandler);

async function getContactsHandler(req: Request<{ senderContactId: string }>, res: Response<Contact[]>) {
	const contacts = await getChatContacts(parseInt(req.params.senderContactId));
	return res.status(200).send(contacts);
}

async function getMessagesHandler(
	req: Request<{ senderContactId: string; contactId: string }>,
	res: Response<Message[]>
) {
	const senderContactId = parseInt(req.params.senderContactId);
	const contactId = parseInt(req.params.contactId);

	const incomingMessages = await getIncomingMessages({
		filter: { fromContactId: [contactId], toContactId: [senderContactId] }
	});

	const outgoingMessages = await getOutgoingMessages({
		filter: { fromContactId: [senderContactId], toContactId: [contactId] }
	});

	const messages = mergeIncomingAndOutgoingMessages(incomingMessages, outgoingMessages);

	return res.status(200).send(messages);
}

async function sendMessageHandler(
	req: Request<{ contactId: string; senderContactId: string }, {}, { message: string }>,
	res: Response<OutgoingMessage | string>
) {
	if (!req.body.message) {
		return res.status(400).send('Invalid request');
	}

	const message = req.body.message;
	const senderContactId = parseInt(req.params.senderContactId);
	const contactId = parseInt(req.params.contactId);

	const senderContact = (await getSenderContacts({ filter: { id: [senderContactId] } }))[0];
	const contact = (await getContacts({ filter: { id: [contactId] } }))[0];

	if (!senderContact || !contact) {
		return res.status(404).send('Contact not found');
	}

	try {
		const data = await sendTextMessage(senderContact, contact, message);
		console.log(data);

		await Promise.all(
			data.messages.map((m) => {
				return addOutgoingMessage({
					whatsAppMessageId: m.id,
					fromContactId: senderContact.id,
					toContactId: contact.id,
					message: message
				});
			})
		);
	} catch (error) {
		console.log(error);
	}

	return res.status(200).send();
}

export default chatRouter;
