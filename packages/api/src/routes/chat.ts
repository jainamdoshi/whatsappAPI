import { Request, Response, Router } from 'express';
import { getChatContacts } from '../model/contacts';
import { Contact } from '../model/db/schema/contacts';
import { getChatMessages, Message } from '../model/messages';

const chatRouter = Router();
chatRouter.get('/contacts/:senderContactId', getContactsHandler);
chatRouter.get('/messages/:contactId', getMessagesHandler);

async function getContactsHandler(req: Request<{ senderContactId: string }>, res: Response<Contact[]>) {
	const contacts = await getChatContacts(parseInt(req.params.senderContactId));
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
