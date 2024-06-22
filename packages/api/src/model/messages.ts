import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { IncomingMessage, incomingMessages, NewIncomingMessage } from './db/schema/incomingMessages';
import { NewOutgoingMessage, OutgoingMessage, outgoingMessages } from './db/schema/outgoingMessages';

export type MessagesType = 'incoming' | 'outgoing';

export type Message = {
	id: number;
	fromContactId: number;
	toContactId: number;
	timestamp: Date;
	message: string;
	type: MessagesType;
};

export async function addIncomingMessage(message: NewIncomingMessage): Promise<IncomingMessage> {
	const res = await db.insert(incomingMessages).values(message).returning();
	return res[0];
}

export async function addOutgoingMessage(message: NewOutgoingMessage): Promise<OutgoingMessage> {
	const res = await db.insert(outgoingMessages).values(message).returning();
	return res[0];
}

export async function getOutgoingMessages<T extends typeof outgoingMessages>(
	options?: Omit<QueryOptions<T>, 'select'>
): Promise<OutgoingMessage[]> {
	let sql = db.select().from(outgoingMessages) as unknown as PgSelect;

	if (options?.filter) {
		sql = sql.where(filterCriteriaBuilder(outgoingMessages, options.filter));
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as OutgoingMessage[];
}

export async function getIncomingMessages<T extends typeof incomingMessages>(
	options?: Omit<QueryOptions<T>, 'select'>
): Promise<IncomingMessage[]> {
	let sql = db.select().from(incomingMessages) as unknown as PgSelect;

	if (options?.filter) {
		sql = sql.where(filterCriteriaBuilder(incomingMessages, options.filter));
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as IncomingMessage[];
}

export async function updateOutgoingMessage<T extends OutgoingMessage, L extends typeof outgoingMessages>(
	updateFields: Partial<T>,
	filter: FilterCriteria<L>
): Promise<OutgoingMessage> {
	const res = await db
		.update(outgoingMessages)
		.set(updateFields)
		.where(filterCriteriaBuilder(outgoingMessages, filter))
		.returning();
	return res[0];
}
