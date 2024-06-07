import { Router } from 'express';
import { Request, Response } from 'express';
import { getGroup } from '../model/groups';
import { NestedGroup, parseGroups } from '../lib/group';
import { Group } from '../model/db/schema/groups';

const groupRouter = Router();
groupRouter.get('/', getGroups);
groupRouter.get('/:groupId', getGroupById);

async function getGroups(_: Request, res: Response<NestedGroup[]>) {
	const groups: Group[] = await getGroup();
	const nestedGroups = parseGroups(groups);
	return res.status(200).send(nestedGroups);
}

async function getGroupById(req: Request<{ groupId: string }, {}, {}, {}>, res: Response<NestedGroup | string>) {
	const groupId = req.params.groupId;
	const group: Group[] = await getGroup({ filter: { id: [parseInt(groupId)] } });

	if (!group.length) {
		return res.status(404).send(`Group with id ${groupId} not found`);
	}

	return res.status(200).send({
		id: group[0].id,
		name: group[0].name,
		subGroup: []
	});
}

export { groupRouter };
