import { char, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { conversation } from './conversations';

export const outgoingMessages = pgTable('outgoing_messages', {
	id: serial('id').primaryKey(),
	conversationId: char('conversation_id', { length: 32 })
		.references(() => conversation.id)
		.notNull(),
	sentTimestamp: timestamp('sent_timestamp').notNull(),
	deliveredTimestamp: timestamp('delivered_timestamp'),
	readTimestamp: timestamp('read_timestamp'),
	message: json('message').notNull()
});

export type OutgoingMessage = typeof outgoingMessages.$inferSelect;
export type NewOutgoingMessage = typeof outgoingMessages.$inferInsert;
