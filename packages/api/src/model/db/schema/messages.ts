import { integer, json, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	timestamp: timestamp('timestamp').notNull(),
    message: json('message').notNull()
});
