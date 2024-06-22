import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { contacts } from './contacts';
import { senderContacts } from './senderContacts';

export const incomingMessages = pgTable('incoming_messages', {
	id: serial('id').primaryKey(),
	fromContactId: integer('from_contact_id')
		.references(() => contacts.id)
		.notNull(),
	toContactId: integer('to_contact_id')
		.references(() => senderContacts.id)
		.notNull(),
	timestamp: timestamp('timestamp').notNull(),
	message: json('message').notNull()
});

export type IncomingMessage = typeof incomingMessages.$inferSelect;
export type NewIncomingMessage = typeof incomingMessages.$inferInsert;
