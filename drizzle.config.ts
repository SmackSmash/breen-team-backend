<<<<<<< HEAD
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: './db/data/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
=======
import { pgTable, varchar, timestamp, serial } from 'drizzle-orm/pg-core';

<<<<<<<< HEAD:db/data/schema.ts
export const usersTable = pgTable('users', {
  user_id: serial().primaryKey().notNull(),
  username: varchar().notNull(),
  created_on: timestamp().defaultNow().notNull()
========
export default defineConfig({
  dialect: 'postgresql',
  schema: './db/data/schema',
  out: './drizzle'
>>>>>>>> a8488c14aaea5739b26e3330e90cbb932488a793:drizzle.config.ts
});

>>>>>>> a8488c14aaea5739b26e3330e90cbb932488a793
