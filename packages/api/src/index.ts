import bodyParser from 'body-parser';
import express from 'express';
import { PORT } from './config/init';
import messageRouter from './routes/message';
import userRouter from './routes/user';
import whatsAppRouter from './routes/whatsapp';

const app = express().use(bodyParser.json());

app.use('/whatsapp', whatsAppRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

app.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
