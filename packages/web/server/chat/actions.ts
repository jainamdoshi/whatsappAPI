import { Contact } from '../contact/action';

export type Message = {
	id: number;
	fromContactId: number;
	timestamp: Date;
	message: string;
	type: 'incoming' | 'outgoing';
};

export async function getChatContacts(senderContactId: number): Promise<Contact[]> {
	const response = await fetch(`http://localhost:8080/chat/contacts/${senderContactId}`);
	return await response.json();
}

export async function getChatMessages(senderContactId: number, contactId: number): Promise<Message[]> {
	const response = await fetch(`http://localhost:8080/chat/messages/${senderContactId}/${contactId}`);
	const messages = await response.json();
	return messages.map((message: Message) => {
		return {
			...message,
			timestamp: new Date(message.timestamp)
		};
	});
}

export async function sendTextMessage(senderContactId: number, contactId: number, message: string) {
	return fetch(`http://localhost:8080/chat/messages/${senderContactId}/${contactId}`, {
		method: 'POST',
		body: JSON.stringify({ message: message }),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
