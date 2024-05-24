import { and, Column, eq, or } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';

type DataType<T extends string> = T extends 'number' ? number : T extends 'string' ? string : never;

type PartialColumn<T> = {
	[K in keyof T]?: T[K] extends PgColumn ? DataType<T[K]['dataType']> : never;
};

type List<T> = {
	[K in keyof T]: T[K][];
};

export type FilterCriteria<T> = List<PartialColumn<T extends PgTableWithColumns<infer K> ? K['columns'] : never>>;
export type SelectedFields<T> = T extends PgTableWithColumns<infer K> ? K['columns'] : never;

export function filterCriteriaBuilder<T>(table: T, filterCriteria: FilterCriteria<T>) {
	const filterKeys = Object.keys(filterCriteria);
	const eqs = filterKeys.map(
		(key) =>
			filterCriteria[key as keyof typeof filterCriteria]?.map((value) =>
				eq(table[key as keyof typeof table] as Column, value)
			) || []
	);
	const union = eqs.map((eq) => or(...eq));
	return and(...union);
}
