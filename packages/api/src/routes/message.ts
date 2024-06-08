import { Request, Response, Router } from 'express';
import { IncomingMessage, NewIncomingMessage } from '../model/db/schema/incomingMessages';
import { User } from '../model/db/schema/users';
import { getIncomingMessages } from '../model/messages';
import { isUserExist } from '../model/users';

const messageRouter = Router();
messageRouter.get('/', getMessages);
messageRouter.post('/', newMessage);

type NewMessageReqBody = NewIncomingMessage & { phoneNumber: string };

async function getMessages(_: Request, res: Response<IncomingMessage[]>) {
	const messages = await getIncomingMessages();
	return res.status(200).send(messages);
}

async function newMessage(req: Request<{}, {}, NewMessageReqBody>, res: Response<IncomingMessage | string>) {
	const message = req.body;
	message.timestamp = new Date(message.timestamp);
	console.log(JSON.stringify(message));

	let user: User | null = null;
	try {
		if (!(await isUserExist(message.phoneNumber))) {
			// user = await addUser({ phoneNumber: message.phoneNumber });
		}

		if (!user) {
			// user = await getUser(message.phoneNumber);
		}

		// const newMessage = await addIncomingMessage({ ...message, userId: user!.id });
		// return res.status(201).send(newMessage);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Error creating message');
	}
}

export default messageRouter;
