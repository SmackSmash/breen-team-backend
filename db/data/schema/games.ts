import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';

const games = pgTable('games', {
  game_id: integer().primaryKey().notNull(),
  name: varchar().notNull()
});

export default games;
