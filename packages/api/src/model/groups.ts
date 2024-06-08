import { getDB } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, SelectedFields } from '../lib/util';
import { groups, NewGroup } from './db/schema/groups';
import { contactGroups } from './db/schema/userGroups';

export async function addGroup(group: NewGroup) {
	const db = await getDB();
	const res = await db.insert(groups).values(group).returning();
	return res[0];
}

export async function getGroup<T extends typeof groups>(options?: {
	select?: SelectedFields<T>;
	filter?: FilterCriteria<T>;
}) {
	const db = await getDB();
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(groups);

	if (options?.filter) {
		const where = filterCriteriaBuilder(groups, options?.filter);
		sql = sql.where(where);
	}

	return await sql.execute();
}

export async function addContactGroup(contactId: number, groupId: number) {
	const db = await getDB();
	const res = await db.insert(contactGroups).values({ contactId, groupId }).returning();
	return res[0];
}

export async function getContactGroups() {
	const db = await getDB();
	const res = await db.select().from(contactGroups).execute();
	return res;
}
