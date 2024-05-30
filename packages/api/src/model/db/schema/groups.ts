import { AnyPgColumn, integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const groups = pgTable('groups', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 50 }).notNull(),
	parentGroupId: integer('parent_group_id').references((): AnyPgColumn => groups.id),
});

export type Groups = typeof groups.$inferSelect;
export type NewGroups = typeof groups.$inferInsert;