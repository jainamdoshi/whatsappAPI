import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { Conversation, conversations, NewConversation } from './db/schema/conversations';

export async function addConversation(conversation: NewConversation): Promise<Conversation> {
	const res = await db.insert(conversations).values(conversation).returning();
	return res[0];
}

export async function getConversation<T extends typeof conversations>(options?: QueryOptions<T>) {
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(conversations) as unknown as PgSelect;

	if (options?.filter) {
		const where = filterCriteriaBuilder(conversations, options.filter);
		sql = sql.where(where);
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as Conversation[];
}
