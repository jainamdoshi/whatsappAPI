import { and, eq } from 'drizzle-orm';
import { getDB } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, SelectedFields } from '../lib/util';
import { userGroups } from './db/schema/userGroups';
import { NewUser, User, users } from './db/schema/users';
import { PgSelect } from 'drizzle-orm/pg-core';

export async function isUserExist(phoneNumber: string): Promise<boolean> {
	const db = await getDB();
	const user = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
	return user.length > 0;
}

export async function addUser(user: NewUser): Promise<User> {
	const db = await getDB();
	const res = await db.insert(users).values(user).returning();
	return res[0];
}

export async function getUsers<T extends typeof users>(options?: {
	select?: SelectedFields<T>;
	filter?: FilterCriteria<T>;
	user_group?: number;
}) {

	const db = await getDB();
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(users) as unknown as PgSelect;

	if (options?.user_group) {
		sql = sql.innerJoin(
			userGroups,
			and(eq(users.id, userGroups.userId), eq(userGroups.groupId, options?.user_group))
		);
	}

	if (options?.filter) {
		const where = filterCriteriaBuilder(users, options?.filter);
		sql = sql.where(where);
	}

	const res = await sql.execute();

	if (options?.user_group) {
		return res.map((user) => user.users);
	}

	return res;
}
