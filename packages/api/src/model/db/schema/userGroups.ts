import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { groups } from './groups';
import { users } from './users';

export const userGroups = pgTable(
	'user_groups',
	{
		userId: integer('user_id')
			.references(() => users.id)
			.notNull(),
		groupId: integer('group_id')
			.references(() => groups.id)
			.notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.userId, table.groupId] })
		};
	}
);

export type UserGroup = typeof userGroups.$inferSelect;
export type NewUserGroup = typeof userGroups.$inferInsert;
