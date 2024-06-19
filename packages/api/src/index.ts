import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { connectDB } from './config/database';
import { PORT } from './config/init';
import contactRouter from './routes/contact';
import { groupRouter } from './routes/group';
import messageRouter from './routes/message';
import senderContactRouter from './routes/senderContact';
import templateRouter from './routes/template';
import whatsAppRouter from './routes/whatsapp';
import { Server } from 'socket.io';
import chatRouter from './routes/chat';

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

app.use(bodyParser.json());
app.use(cors());

app.use('/whatsapp', whatsAppRouter);
app.use('/contact', contactRouter);
app.use('/group', groupRouter);
app.use('/message', messageRouter);
app.use('/senderContact', senderContactRouter);
app.use('/template', templateRouter);
app.use('/chat', chatRouter);

server.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	await connectDB();
});

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
});
