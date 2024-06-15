import { pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { senderContacts } from './senderContacts';

export const languageEnum = pgEnum('language', ['en_US']);
export const categoryEnum = pgEnum('category', ['marketing', 'utility']);

export const templates = pgTable('templates', {
	id: serial('id').primaryKey(),
	senderContactId: serial('sender_contact_id')
		.references(() => senderContacts.id)
		.notNull(),
	name: varchar('name', { length: 256 }).notNull(),
	language: languageEnum('language').notNull(),
	category: categoryEnum('category').notNull()
});

export type Template = typeof templates.$inferSelect;
export type NewTemplate = typeof templates.$inferInsert;
