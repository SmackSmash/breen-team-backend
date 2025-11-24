import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import users from './users';
import games from './games';

const scores = pgTable('scores', {
  score_id: integer().primaryKey().notNull(),
  score: integer().notNull(),
  user_id: integer()
    .references(() => users.user_id)
    .notNull(),
  username: varchar()
    .notNull()
    .references(() => users.username),
  game_id: integer()
    .notNull()
    .references(() => games.game_id),
  created_on: timestamp().defaultNow().notNull()
});

export default scores;
