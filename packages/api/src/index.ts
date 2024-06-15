import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { PORT } from './config/init';
import messageRouter from './routes/message';
import contactRouter from './routes/contact';
import whatsAppRouter from './routes/whatsapp';
import { groupRouter } from './routes/group';
import { connectDB } from './config/database';
import senderContactRouter from './routes/senderContact';
import templateRouter from './routes/template';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/whatsapp', whatsAppRouter);
app.use('/contact', contactRouter);
app.use('/group', groupRouter);
app.use('/message', messageRouter);
app.use('/senderContact', senderContactRouter);
app.use('/template', templateRouter);

app.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	await connectDB();
});
