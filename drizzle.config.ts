import * as dotenv from 'dotenv';
dotenv.config();
const DatabaseURL = process.env.DATABASE_URL;
import { defineConfig, Config } from 'drizzle-kit'; // Add Config import
export default defineConfig({
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DatabaseURL || '', // Assign a default value of empty string if DatabaseURL is undefined
  }
});