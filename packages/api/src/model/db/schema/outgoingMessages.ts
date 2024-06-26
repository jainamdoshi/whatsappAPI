import { char, integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { contacts } from './contacts';
import { senderContacts } from './senderContacts';

export const outgoingMessages = pgTable('outgoing_messages', {
	id: serial('id').primaryKey(),
	whatsAppMessageId: char('whatsapp_message_id', { length: 58 }).notNull(),
	fromContactId: integer('from_contact_id')
		.references(() => senderContacts.id)
		.notNull(),
	toContactId: integer('to_contact_id')
		.references(() => contacts.id)
		.notNull(),
	sentTimestamp: timestamp('sent_timestamp'),
	deliveredTimestamp: timestamp('delivered_timestamp'),
	readTimestamp: timestamp('read_timestamp'),
	failedTimestamp: timestamp('failed_timestamp'),
	message: json('message').notNull()
});

export type OutgoingMessage = typeof outgoingMessages.$inferSelect;
export type NewOutgoingMessage = typeof outgoingMessages.$inferInsert;
