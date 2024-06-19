import { Request, Response, Router } from 'express';
import { getChatContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { getChatMessages, Message } from '../model/messages';

const chatRouter = Router();
chatRouter.get('/contacts', getContactsHandler);
chatRouter.get('/messages/:contactId', getMessagesHandler);

async function getContactsHandler(_: Request, res: Response<Contact[]>) {
	const contacts = await getChatContacts();
	return res.status(200).send(contacts);
}

async function getMessagesHandler(req: Request<{ contactId: string }>, res: Response<Message[]>) {
	const contactId = parseInt(req.params.contactId);
	const messages = await getChatMessages({
		filter: { fromContactId: [contactId] }
	});
	return res.status(200).send(messages);
}

export default chatRouter;
