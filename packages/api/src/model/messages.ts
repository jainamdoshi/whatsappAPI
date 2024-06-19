import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { IncomingMessage, incomingMessages, NewIncomingMessage } from './db/schema/incomingMessages';
import { OutgoingMessage, outgoingMessages } from './db/schema/outgoingMessages';

export type MessagesType = 'incoming' | 'outgoing';

export type Message = IncomingMessage & { type: MessagesType };

export async function addIncomingMessage(message: NewIncomingMessage): Promise<IncomingMessage> {
	const res = await db.insert(incomingMessages).values(message).returning();
	return res[0];
}

export async function addOutgoingMessage(message: OutgoingMessage): Promise<OutgoingMessage> {
	const res = await db.insert(outgoingMessages).values(message).returning();
	return res[0];
}

export async function getIncomingMessages(): Promise<IncomingMessage[]> {
	return await db.select().from(incomingMessages);
}

export async function getOutgoingMessages(): Promise<OutgoingMessage[]> {
	return await db.select().from(outgoingMessages);
}

export async function getChatMessages<T extends typeof incomingMessages>(
	options?: Omit<QueryOptions<T>, 'select'>
): Promise<Message[]> {
	let sql = db.select().from(incomingMessages) as unknown as PgSelect;

	if (options?.filter) {
		sql = sql.where(filterCriteriaBuilder(incomingMessages, options.filter));
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	const res = (await sql.execute()) as IncomingMessage[];

	return res.map((message) => ({ ...message, type: 'incoming' }));
}
