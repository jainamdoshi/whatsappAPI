import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { groups } from './groups';
import { contacts } from './contacts';

export const contactGroups = pgTable(
	'contact_groups',
	{
		contactId: integer('contact_id')
			.references(() => contacts.id)
			.notNull(),
		groupId: integer('group_id')
			.references(() => groups.id)
			.notNull()
	},
	(table) => {
		return {
			pk: primaryKey({ columns: [table.contactId, table.groupId] })
		};
	}
);

export type ContactGroup = typeof contactGroups.$inferSelect;
export type NewContactGroup = typeof contactGroups.$inferInsert;
