import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { messages } from './messages';
import { users } from './users';

export const forwardedMessages = pgTable('forwarded_messages', {
	id: serial('id').primaryKey(),
	messageId: integer('message_id').references(() => messages.id),
	forwardedToUserId: integer('forwarded_to_user_id').references(() => users.id),
	timestamp: timestamp('timestamp').notNull()
});

export type ForwardedMessage = typeof forwardedMessages.$inferSelect
export type NewForwardedMessage = typeof forwardedMessages.$inferInsert