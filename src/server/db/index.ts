import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '~/env';
import * as schema from './schema';

// For node environments (production and development)
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, { schema });

// Helper to run migrations
export const runMigrations = async () => {
  // This function will be implemented when needed
  // Optionally, you could add the drizzle-kit migrate command here
  console.log('Running migrations...');
};

export type DB = typeof db; 