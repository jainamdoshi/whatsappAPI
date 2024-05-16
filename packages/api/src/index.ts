import express from 'express';
import bodyParser from 'body-parser';
import whatsAppRouter from './routes/whatsapp';

const app = express().use(bodyParser.json());
const port = 3000;

app.use('/whatsapp', whatsAppRouter);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
