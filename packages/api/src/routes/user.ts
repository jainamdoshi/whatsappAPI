import { Request, Response, Router } from 'express';
import { NewUser, User } from '../model/db/schema/users';
import { addUser, getUsers } from '../model/users';
import { loadUserDataFromCSV, RawUserData } from '../lib/csvLoader';
import { parseRawUserData } from '../lib/users';
import { Group } from '../model/db/schema/groups';
import { addGroup, getGroup } from '../model/groups';

const userRouter = Router();

userRouter.get('/', getUsersHandler);
userRouter.post('/', newUser);
userRouter.post('/load', loadUser);

type GetUsersQuery = {
	group?: number;
};

type LoadUserBody = {
	fileName: string;
	groupName: string;
};

async function getUsersHandler(req: Request<{}, {}, {}, GetUsersQuery>, res: Response<User[]>) {
	const options = req.query.group ? { user_group: req.query.group } : {};

	const allUsers = await getUsers(options);
	return res.status(200).send(allUsers);
}

async function newUser(req: Request<{}, {}, NewUser>, res: Response<User | string>) {
	const user = req.body;

	if (!user) {
		return res.status(400).send('No user data provided');
	}

	try {
		const newUser = await addUser(user);
		return res.status(201).send(newUser);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Error creating user');
	}
}

async function loadUser(req: Request<{}, {}, LoadUserBody, {}>, res: Response) {
	const data: RawUserData[] = await loadUserDataFromCSV(req.body.fileName);
	let group: Group = (await getGroup({ filter: { name: [req.body.groupName] } }))[0];

	if (!group) {
		group = await addGroup({ name: req.body.groupName });
	}

	const result = await parseRawUserData(data, group.id);
	console.log(result.length);
	return res.status(200).send(result);
}

export default userRouter;
