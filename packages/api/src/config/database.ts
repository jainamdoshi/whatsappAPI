import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './init';

export const dbConfig = {
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	database: DB_DATABASE,
	password: DB_PASSWORD,
	ssl: false
};

const client = postgres(dbConfig);
export const db = drizzle(client);
