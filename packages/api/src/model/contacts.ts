import { and, eq } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { contactGroups } from './db/schema/contactGroups';
import { Contact, contacts, NewContact } from './db/schema/contacts';
import { incomingMessages } from './db/schema/incomingMessages';

export async function isContactExist(phoneNumber: string): Promise<boolean> {
	const contact = await db.select().from(contacts).where(eq(contacts.phoneNumber, phoneNumber));
	return contact.length > 0;
}

export async function addContact(contact: NewContact): Promise<Contact> {
	const res = await db.insert(contacts).values(contact).returning();
	return res[0];
}

// Need to change the name of the table to contact_groups, there is bug in drizzle-kit
export async function getContacts<T extends typeof contacts>(options?: QueryOptions<T> & { user_group?: number }) {
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

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	const res = await sql.execute();

	if (options?.user_group) {
		return res.map((contact) => contact.contacts) as Contact[];
	}

	return res as Contact[];
}

export async function getChatContacts(senderContactId: number) {
	const chatContacts = await db
		.selectDistinctOn([contacts.id])
		.from(contacts)
		.innerJoin(
			incomingMessages,
			and(eq(contacts.id, incomingMessages.fromContactId), eq(incomingMessages.toContactId, senderContactId))
		);

	return chatContacts.map((contact) => contact.contacts) as Contact[];
}
