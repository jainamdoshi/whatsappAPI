import { eq } from 'drizzle-orm';
import { getDB } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, SelectedFields } from '../lib/util';
import { NewUser, User, users } from './db/schema/users';

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
}) {
	const db = await getDB();
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	if (options?.filter) {
		const where = filterCriteriaBuilder(users, options?.filter);
		sql = sql.from(users).where(where);
	} else {
		sql = sql.from(users);
	}

	return await sql.execute();
}
