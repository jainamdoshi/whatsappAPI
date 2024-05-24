import { Request, Response, Router } from 'express';
import { NewUser, User } from '../model/db/schema/users';
import { addUser } from '../model/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.post('/', newUser);

async function getUsers(_: Request, res: Response<User[]>) {
	// const allUsers = await getAllUsers();
	// return res.status(200).send(allUsers);
}

async function newUser(req: Request<any, any, NewUser>, res: Response<User | string>) {
	const user = req.body;
	user.phoneNumber = user.phoneNumber.toString();

	try {
		const newUser = await addUser(user);
		return res.status(201).send(newUser);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Error creating user');
	}
}

export default userRouter;
