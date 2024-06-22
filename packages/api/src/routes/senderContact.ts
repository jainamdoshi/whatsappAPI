import { Request, Response, Router } from 'express';
import { getSenderContacts } from '../model/senderContacts';
import { SenderContact, senderContacts } from '../model/db/schema/senderContacts';
import { FilterCriteria } from '../lib/util';

const senderContactRouter = Router();

senderContactRouter.get('/', getSenderContactsHandler);

type SenderContactQuery = Partial<SenderContact>;

async function getSenderContactsHandler(req: Request<{}, {}, {}, SenderContactQuery>, res: Response<SenderContact[]>) {
	const filter = Object.keys(req.query).reduce((acc: any, key) => {
		acc[key] = [req.query[key as keyof SenderContactQuery]];
		return acc;
	}, {} as SenderContactQuery);

	const contacts = await getSenderContacts({
		filter: filter as FilterCriteria<typeof senderContacts>
	});

	return res.status(200).send(contacts);
}

export default senderContactRouter;
