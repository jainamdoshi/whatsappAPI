import { char, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const senderContacts = pgTable('sender_contacts', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 256 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 15 }).notNull(),
	whatsAppPhoneNumberId: char('whatsapp_phone_number_id', { length: 15 }).notNull().unique()
});

export type SenderContact = typeof senderContacts.$inferSelect;
export type NewSenderContact = typeof senderContacts.$inferInsert;