import { getDB } from '../config/database';
import { Message, messages, NewMessage } from './db/schema/messages';

export async function addMessage(message: NewMessage): Promise<Message> {
	const db = await getDB();
	const res = await db.insert(messages).values(message).returning();
	return res[0];
}

export async function getAllMessages(): Promise<Message[]> {
	const db = await getDB();
	return await db.select().from(messages);
}
