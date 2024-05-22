import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const incomingMessages = pgTable('incoming_messages', {
	id: serial('id').primaryKey(),
	fromUserId: integer('from_user_id')
		.references(() => users.id)
		.notNull(),
	toUserId: integer('to_user_id')
		.references(() => users.id)
		.notNull(),
	timestamp: timestamp('timestamp').notNull(),
	message: json('message').notNull()
});

export type IncomingMessages = typeof incomingMessages.$inferSelect;
export type NewIncomingMessages = typeof incomingMessages.$inferInsert;
