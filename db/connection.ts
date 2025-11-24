import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from 'dotenv'
import path from 'path'

const ENV = process.env.NODE_ENV || 'development';

// the same as __dirname but in module
const __dirname = path.dirname(__filename);
// dotenv config using module way instead of require
dotenv.config({ path: path.join(__dirname, '../.env.') })


if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL configured');
} else {
  console.log('Connected to:', process.env.DATABASE_URL);
}

const db = drizzle(process.env.DATABASE_URL!);

export default db;
