import { PgSelect } from 'drizzle-orm/pg-core';
import { db } from '../config/database';
import { filterCriteriaBuilder, orderByBuilder, QueryOptions } from '../lib/util';
import { Template, templates } from './db/schema/templates';

export async function getTemplates<T extends typeof templates>(options?: QueryOptions<T>) {
	let sql;

	if (options?.select) {
		sql = db.select(options.select);
	} else {
		sql = db.select();
	}

	sql = sql.from(templates) as unknown as PgSelect;

	if (options?.filter) {
		const where = filterCriteriaBuilder(templates, options.filter);
		sql = sql.where(where);
	}

	if (options?.orderByColumns) {
		sql = sql.orderBy(...orderByBuilder(options.orderByColumns));
	}

	return (await sql.execute()) as Template[];
}
