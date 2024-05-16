import { defineConfig } from 'drizzle-kit';
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from './src/config/init.ts';

export default defineConfig({
	schema: './src/db/schema',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		database: DB_DATABASE,
		password: DB_PASSWORD,
	},
	verbose: true,
	strict: true
});
