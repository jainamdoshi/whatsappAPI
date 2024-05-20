import { eq } from 'drizzle-orm';
import { getDB } from '../config/database';
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

export async function getUser(phoneNumber: string): Promise<User | null> {
	const db = await getDB();
	const res = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
	return res[0];
}

export async function getAllUsers(): Promise<User[]> {
	const db = await getDB();
	return await db.select().from(users);
}
