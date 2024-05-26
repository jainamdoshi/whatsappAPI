import { char, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { conversation } from './conversations';

export const incomingMessages = pgTable('incoming_messages', {
	id: serial('id').primaryKey(),
	conversationId: char('conversation_id', { length: 32 })
		.references(() => conversation.id)
		.notNull(),
	timestamp: timestamp('timestamp').notNull(),
	message: json('message').notNull()
});

export type IncomingMessages = typeof incomingMessages.$inferSelect;
export type NewIncomingMessages = typeof incomingMessages.$inferInsert;
