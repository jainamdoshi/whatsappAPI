import { char, integer, pgTable } from 'drizzle-orm/pg-core';
import { contacts } from './contacts';

export const conversations = pgTable('conversations', {
	id: char('id', { length: 32 }).primaryKey(),
	contactId: integer('contact_id')
		.references(() => contacts.id)
		.notNull(),
	contactId2: integer('contact_id2')
		.references(() => contacts.id)
		.notNull()
});

export type Conversation = typeof conversations.$inferSelect;
export type NewConversation = typeof conversations.$inferInsert;
