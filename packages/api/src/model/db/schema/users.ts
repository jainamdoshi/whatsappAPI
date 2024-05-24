import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }).notNull(),
	phoneNumber: varchar('phone_number', { length: 15 }).notNull().unique()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
