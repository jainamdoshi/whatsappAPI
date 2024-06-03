import { getDB } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, SelectedFields } from '../lib/util';
import { groups, NewGroup } from './db/schema/groups';
import { userGroups } from './db/schema/userGroups';

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

export async function addUserGroup(userId: number, groupId: number) {
	const db = await getDB();
	const res = await db.insert(userGroups).values({ userId, groupId }).returning();
	return res[0];
}

export async function getUserGroups() {
	const db = await getDB();
	const res = await db.select().from(userGroups).execute();
	return res;
}
