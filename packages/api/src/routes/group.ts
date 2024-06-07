import { Router } from 'express';
import { Request, Response } from 'express';
import { getGroup } from '../model/groups';
import { parseGroups } from '../lib/group';

const groupRouter = Router();
groupRouter.get('/', getGroups);

async function getGroups(_: Request, res: Response) {
	const groups = await getGroup();
	const nestedGroups = parseGroups(groups);
	return res.status(200).send(nestedGroups);
}

export { groupRouter };
