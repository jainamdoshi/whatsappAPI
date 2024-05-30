import { Request, Response, Router } from 'express';
import { NewUser, User } from '../model/db/schema/users';
import { addUser, getUsers } from '../model/users';

const userRouter = Router();

userRouter.get('/', getUsersHandler);
userRouter.post('/', newUser);

async function getUsersHandler(req: Request<any, any, any, { group: number }>, res: Response<User[]>) {
	// if (req.query.group) {
	// const users = await getUsers();
	// return res.status(200).send(users);
	// }

	const allUsers = await getUsers();
	console.log(allUsers);
	// return res.status(200).send(allUsers);
	return res.status(200);
}

async function newUser(req: Request<any, any, NewUser>, res: Response<User | string>) {
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

export default userRouter;
