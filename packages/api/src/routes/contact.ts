import { Request, Response, Router } from 'express';
import { NewContact, Contact } from '../model/db/schema/contacts';
import { addContact, getContacts } from '../model/contacts';
import { loadContactDataFromCSV, RawContactData } from '../lib/csvLoader';
import { parseRawContactData } from '../lib/contacts';
import { Group } from '../model/db/schema/groups';
import { addGroup, getGroup } from '../model/groups';

const contactRouter = Router();

contactRouter.get('/', getContactsHandler);
contactRouter.post('/', newContact);
contactRouter.post('/load', loadContact);

type GetContactsQuery = {
	group?: number;
};

type LoadContactBody = {
	fileName: string;
	groupName: string;
};

async function getContactsHandler(req: Request<{}, {}, {}, GetContactsQuery>, res: Response<Contact[]>) {
	const options = req.query.group ? { user_group: req.query.group } : {};

	const allContacts = await getContacts(options);
	return res.status(200).send(allContacts);
}

async function newContact(req: Request<{}, {}, NewContact>, res: Response<Contact | string>) {
	const contact = req.body;

	if (!contact) {
		return res.status(400).send('No contact data provided');
	}

	try {
		const newContact = await addContact(contact);
		return res.status(201).send(newContact);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Error creating contact');
	}
}

async function loadContact(req: Request<{}, {}, LoadContactBody, {}>, res: Response) {
	const data: RawContactData[] = await loadContactDataFromCSV(req.body.fileName);
	let group: Group = (await getGroup({ filter: { name: [req.body.groupName] } }))[0];

	if (!group) {
		group = await addGroup({ name: req.body.groupName });
	}

	const result = await parseRawContactData(data, group.id);
	return res.status(200).send(result);
}

export default contactRouter;
