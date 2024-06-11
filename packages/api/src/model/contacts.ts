import { and, eq } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { getDB } from '../config/database';
import { FilterCriteria, filterCriteriaBuilder, SelectedFields } from '../lib/util';
import { contactGroups } from './db/schema/contactGroups';
import { Contact, contacts, NewContact } from './db/schema/contacts';

export async function isContactExist(phoneNumber: string): Promise<boolean> {
	const db = await getDB();
	const contact = await db.select().from(contacts).where(eq(contacts.phoneNumber, phoneNumber));
	return contact.length > 0;
}

export async function addContact(contact: NewContact): Promise<Contact> {
	const db = await getDB();
	const res = await db.insert(contacts).values(contact).returning();
	return res[0];
}

export async function getContacts<T extends typeof contacts>(options?: {
	select?: SelectedFields<T>;
	filter?: FilterCriteria<T>;
	// Need to change the name of the table to contact_groups, there is bug in drizzle-kit
	user_group?: number;
}) {
	const db = await getDB();
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(contacts) as unknown as PgSelect;

	if (options?.user_group) {
		sql = sql.innerJoin(
			contactGroups,
			and(eq(contacts.id, contactGroups.contactId), eq(contactGroups.groupId, options?.user_group))
		);
	}

	if (options?.filter) {
		const where = filterCriteriaBuilder(contacts, options?.filter);
		sql = sql.where(where);
	}

	sql = sql.orderBy(contacts.name);

	const res = await sql.execute();

	if (options?.user_group) {
		return res.map((contact) => contact.contacts);
	}

	return res;
}
