import db from '../connection.js';
import { users } from '../data/schema/users.js';
import { scores } from '../data/schema/scores.js';
import { games } from '../data/schema/games.js';
import { seed } from 'drizzle-seed';

async function seedTable(count?: number) {
  await seed(db, { users, scores, games }, { count: count || 10 });
}

export default seedTable;
