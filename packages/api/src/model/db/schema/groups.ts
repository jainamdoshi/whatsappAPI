import { AnyPgColumn, integer, pgTable, serial, unique, varchar } from 'drizzle-orm/pg-core';

export const groups = pgTable(
	'groups',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 50 }).notNull(),
		parentGroupId: integer('parent_group_id').references((): AnyPgColumn => groups.id)
	},
	(table) => ({
		unique: unique().on(table.name, table.parentGroupId)
	})
);

export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;
