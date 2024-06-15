import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { SenderContact, senderContacts } from './db/schema/senderContacts';

export async function getSenderContact<T extends typeof senderContacts>(options?: QueryOptions<T>) {
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(senderContacts) as unknown as PgSelect;

	if (options?.filter) {
		const where = filterCriteriaBuilder(senderContacts, options.filter);
		sql = sql.where(where);
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as SenderContact[];
}
