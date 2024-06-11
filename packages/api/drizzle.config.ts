import { defineConfig } from 'drizzle-kit';
import { dbConfig } from './src/config/database';

export default defineConfig({
	schema: './src/model/db/schema',
	dialect: 'postgresql',
	out: './drizzle',
	dbCredentials: dbConfig,
	verbose: true,
	strict: true
});
