import express from 'express';
import bodyParser from 'body-parser';
import whatsAppRouter from './routes/whatsapp';
import { getDB } from './config/database';
import { User, users } from './db/schema/users';

const app = express().use(bodyParser.json());
const port = 3000;

app.use('/whatsapp', whatsAppRouter);

app.listen(port, async () => {
	const db = await getDB();
	const res: User[] = await db.select().from(users);
	console.log(res);
	console.log(`Server is running on http://localhost:${port}`);
});
