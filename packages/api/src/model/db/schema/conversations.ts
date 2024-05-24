import { char, integer, pgTable } from 'drizzle-orm/pg-core';
import { users } from './users';

export const conversation = pgTable('conversations', {
	id: char('id', { length: 32 }).primaryKey(),
	userId: integer('user_id')
		.references(() => users.id)
		.notNull(),
	userId2: integer('user_id2')
		.references(() => users.id)
		.notNull()
});

export type Conversation = typeof conversation.$inferSelect;
export type NewConversation = typeof conversation.$inferInsert;
