import express from 'express';
import bodyParser from 'body-parser';
import whatsAppRouter from './routes/whatsapp';
import { getDB } from './config/database';
import { User, users } from './db/schema/users';
import { PORT } from './config/init';

const app = express().use(bodyParser.json());

app.use('/whatsapp', whatsAppRouter);

app.listen(PORT, async () => {
	const db = await getDB();
	const res: User[] = await db.select().from(users);
	console.log(res);
	console.log(`Server is running on http://localhost:${PORT}`);
});
