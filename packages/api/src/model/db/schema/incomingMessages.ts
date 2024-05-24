import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { conversation } from './conversations';

export const incomingMessages = pgTable('incoming_messages', {
	id: serial('id').primaryKey(),
	conversationId: integer('conversation_id')
		.references(() => conversation.id)
		.notNull(),
	timestamp: timestamp('timestamp').notNull(),
	message: json('message').notNull()
});

export type IncomingMessages = typeof incomingMessages.$inferSelect;
export type NewIncomingMessages = typeof incomingMessages.$inferInsert;
