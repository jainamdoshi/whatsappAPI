import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const outgoingMessages = pgTable('outgoing_messages', {
	id: serial('id').primaryKey(),
	fromUserId: integer('from_user_id')
		.references(() => users.id)
		.notNull(),
	toUserId: integer('to_user_id')
		.references(() => users.id)
		.notNull(),
	sentTimestamp: timestamp('sent_timestamp').notNull(),
	deliveredTimestamp: timestamp('delivered_timestamp'),
	readTimestamp: timestamp('read_timestamp'),
	message: json('message').notNull()
});

export type OutgoingMessages = typeof outgoingMessages.$inferSelect;
export type NewOutgoingMessages = typeof outgoingMessages.$inferInsert;
