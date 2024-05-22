import { getDB } from '../config/database';
import { IncomingMessages, incomingMessages, NewIncomingMessages } from './db/schema/incomingMessages';
import { OutgoingMessages, outgoingMessages } from './db/schema/outgoingMessages';

export type MessagesType = 'incoming' | 'outgoing';

export async function addIncomingMessage(message: NewIncomingMessages): Promise<IncomingMessages> {
	const db = await getDB();
	const res = await db.insert(incomingMessages).values(message).returning();
	return res[0];
}

export async function addOutgoingMessage(message: OutgoingMessages): Promise<OutgoingMessages> {
	const db = await getDB();
	const res = await db.insert(outgoingMessages).values(message).returning();
	return res[0];
}

export async function getIncomingMessages(): Promise<IncomingMessages[]> {
	const db = await getDB();
	return await db.select().from(incomingMessages);
}

export async function getOutgoingMessages(): Promise<OutgoingMessages[]> {
	const db = await getDB();
	return await db.select().from(outgoingMessages);
}
