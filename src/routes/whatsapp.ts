import { Router } from 'express';
import { Request, Response } from 'express';
import { WHATSAPP_VERIFY_TOKEN } from '../config/init';
import { EventNotification } from '../model/eventNotification';

const whatsAppRouter = Router();

whatsAppRouter.get('/', verifyingRequest);
whatsAppRouter.post('/', eventNotification);
whatsAppRouter.post('/send', sendMessage);

async function verifyingRequest(req: Request, res: Response) {
	const mode = req.query['hub.mode'];
	const challenge = req.query['hub.challenge'];
	const token = req.query['hub.verify_token'];

	if (mode == 'subscribe' && token == WHATSAPP_VERIFY_TOKEN) {
		return res.status(200).send(challenge);
	}

	return res.status(403).send('Forbidden');
}

async function eventNotification(req: Request<any, any, EventNotification>, res: Response) {
	const events = req.body;
	console.log(JSON.stringify(events.entry));
	return res.status(200).send('EVENT_RECEIVED');
}

async function sendMessage(req: Request, res: Response) {
	const { recipient, message } = req.body;
	console.log(`Recipient: ${recipient}, Message: ${message}`);
	return res.status(200).send('Message sent');
}

export default whatsAppRouter;
