import { Request, Response, Router } from 'express';
import { sendTextMessage } from '../lib/messages';
import { getChatContacts, getContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { OutgoingMessage } from '../model/db/schema/outgoingMessages';
import { getChatMessages, Message } from '../model/messages';
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

	const messages = await getChatMessages({
		filter: { fromContactId: [contactId], toContactId: [senderContactId] }
	});
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

	const contacts = await Promise.all([
		getSenderContacts({ filter: { id: [senderContactId] } }),
		getContacts({ filter: { id: [contactId] } })
	]);

	if (contacts[0].length === 0 || contacts[1].length === 0) {
		return res.status(404).send('Contact not found');
	}

	try {
		const data = await sendTextMessage(contacts[0][0], contacts[1][0], message);
		
		console.log(data);
	} catch (error) {
		console.log(error);
	}

	return res.status(200).send();
}

export default chatRouter;
