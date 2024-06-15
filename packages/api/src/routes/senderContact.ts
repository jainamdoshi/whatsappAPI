import { Request, Response, Router } from 'express';
import { getSenderContact } from '../model/senderContacts';
import { SenderContact } from '../model/db/schema/senderContacts';

const senderContactRouter = Router();

senderContactRouter.get('/', getSenderContactsHandler);

async function getSenderContactsHandler(_: Request, res: Response<SenderContact[]>) {
	const senderContacts = await getSenderContact();
	return res.status(200).send(senderContacts);
}

export default senderContactRouter;
