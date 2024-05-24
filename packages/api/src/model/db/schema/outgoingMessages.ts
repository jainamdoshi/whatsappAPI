import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { conversation } from './conversations';

export const outgoingMessages = pgTable('outgoing_messages', {
	id: serial('id').primaryKey(),
	conversationId: integer('conversation_id')
		.references(() => conversation.id)
		.notNull(),
	sentTimestamp: timestamp('sent_timestamp').notNull(),
	deliveredTimestamp: timestamp('delivered_timestamp'),
	readTimestamp: timestamp('read_timestamp'),
	message: json('message').notNull()
});

export type OutgoingMessages = typeof outgoingMessages.$inferSelect;
export type NewOutgoingMessages = typeof outgoingMessages.$inferInsert;