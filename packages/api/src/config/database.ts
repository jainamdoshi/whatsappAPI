import { drizzle, NodePgClient, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const clientDB = new Client({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: 'adminadmin',
	database: 'postgres'
});

let db: NodePgDatabase;

export async function getDB() {
	if (db) {
		return db;
	}
	await clientDB.connect();
	db = drizzle(clientDB);
	return db;
}
