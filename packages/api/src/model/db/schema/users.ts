import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const contacts = pgTable('contacts', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 15 }).notNull().unique()
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
