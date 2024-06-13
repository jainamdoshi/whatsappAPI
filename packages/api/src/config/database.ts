import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './init';

export const dbConfig = {
	host: DB_HOST,
	port: DB_PORT,
	user: DB_USER,
	database: DB_DATABASE,
	password: DB_PASSWORD,
	ssl: false
};

const clientDB = new Client(dbConfig);

export let db: NodePgDatabase;

export async function connectDB() {
	await clientDB.connect();
	db = drizzle(clientDB);
	console.log('Database connected successfully!');
}
