import { Request, Response, Router } from 'express';
import { Template } from '../model/db/schema/templates';
import { getTemplates } from '../model/templates';

const templateRouter = Router();

templateRouter.get('/', getSenderContactsHandler);

async function getSenderContactsHandler(_: Request, res: Response<Template[]>) {
	const templates = await getTemplates();
	return res.status(200).send(templates);
}

export default templateRouter;
