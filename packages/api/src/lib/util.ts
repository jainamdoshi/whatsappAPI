import { and, asc, Column, desc, eq, or } from 'drizzle-orm';
import { PgColumn, PgTableWithColumns } from 'drizzle-orm/pg-core';

type DataType<T extends string> = T extends 'number' ? number : T extends 'string' ? string : never;

// Retrieves the datatype of the column
type PartialColumn<T> = {
	[K in keyof T]?: T[K] extends PgColumn ? DataType<T[K]['dataType']> : never;
};

type List<T> = {
	[K in keyof T]: T[K][];
};

export type FilterCriteria<T> = List<PartialColumn<T extends PgTableWithColumns<infer K> ? K['columns'] : never>>;
type SelectedFields<T> = T extends PgTableWithColumns<infer K> ? K['columns'] : never;
type OrderedColumns<T> = T extends PgTableWithColumns<infer K>
	? { column: K['columns']; order: 'asc' | 'desc' }[]
	: never;

export type QueryOptions<T> = {
	select?: SelectedFields<T>;
	filter?: FilterCriteria<T>;
	orderByColumns?: OrderedColumns<T>;
};

export function filterCriteriaBuilder<T extends PgTableWithColumns<any>>(table: T, filterCriteria: FilterCriteria<T>) {
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

export function orderByBuilder<T extends PgTableWithColumns<any>>(orderByColumns: OrderedColumns<T>) {
	return orderByColumns.map((column) => {
		const order = column.order == 'asc' ? asc : desc;
		return order(column.column);
	});
}
