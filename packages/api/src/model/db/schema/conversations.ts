import { char, integer, pgTable } from 'drizzle-orm/pg-core';
import { contacts } from './users';

export const conversation = pgTable('conversations', {
	id: char('id', { length: 32 }).primaryKey(),
	contactId: integer('contact_id')
		.references(() => contacts.id)
		.notNull(),
	contactId2: integer('contact_id2')
		.references(() => contacts.id)
		.notNull()
});

export type Conversation = typeof conversation.$inferSelect;
export type NewConversation = typeof conversation.$inferInsert;
