import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { contactGroups } from './db/schema/contactGroups';
import { Group, groups, NewGroup } from './db/schema/groups';

export async function addGroup(group: NewGroup) {
	const res = await db.insert(groups).values(group).returning();
	return res[0];
}

export async function getGroup<T extends typeof groups>(options?: QueryOptions<T>) {
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(groups) as unknown as PgSelect;

	if (options?.filter) {
		const where = filterCriteriaBuilder(groups, options.filter);
		sql = sql.where(where);
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as Group[];
}

export async function addContactGroup(contactId: number, groupId: number) {
	const res = await db.insert(contactGroups).values({ contactId, groupId }).returning();
	return res[0];
}

export async function getContactGroups() {
	const res = await db.select().from(contactGroups).execute();
	return res;
}
