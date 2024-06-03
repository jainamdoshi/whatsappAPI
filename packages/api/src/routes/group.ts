import { Router } from 'express';
import { Request, Response } from 'express';
import { getGroup } from '../model/groups';

const groupRouter = Router();
groupRouter.get('/', getGroups);

async function getGroups(_: Request, res: Response) {
	const groups = await getGroup();
	return res.status(200).send(groups);
}

export { groupRouter };
