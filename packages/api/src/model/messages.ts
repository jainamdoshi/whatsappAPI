import { getDB } from '../config/database';
import { IncomingMessage, incomingMessages, NewIncomingMessage } from './db/schema/incomingMessages';
import { OutgoingMessage, outgoingMessages } from './db/schema/outgoingMessages';

export type MessagesType = 'incoming' | 'outgoing';

export async function addIncomingMessage(message: NewIncomingMessage): Promise<IncomingMessage> {
	const db = await getDB();
	const res = await db.insert(incomingMessages).values(message).returning();
	return res[0];
}

export async function addOutgoingMessage(message: OutgoingMessage): Promise<OutgoingMessage> {
	const db = await getDB();
	const res = await db.insert(outgoingMessages).values(message).returning();
	return res[0];
}

export async function getIncomingMessages(): Promise<IncomingMessage[]> {
	const db = await getDB();
	return await db.select().from(incomingMessages);
}

export async function getOutgoingMessages(): Promise<OutgoingMessage[]> {
	const db = await getDB();
	return await db.select().from(outgoingMessages);
}
