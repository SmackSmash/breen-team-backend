import { eq } from 'drizzle-orm';
import db from '../db/connection.js';
import { users } from '../db/data/schema.js';
import { scores } from '../db/data/schema.js';
import { desc } from 'drizzle-orm';
import { usersType } from '../types/index.js';

export const readUsers = async () => {
  return await db.select().from(users);
};

export const readUserById = async (user_id: number) => {
  return await db.select().from(users).where(eq(users.user_id, user_id));
};

export const readUserByUsername = async (username: string): Promise<usersType> => {
  return await db.select().from(users).where(eq(users.username, username));
};

export const readScores = async (page: number) => {
  type score = {
    score_id: number;
    score: number;
    user_id: number;
    username: string;
    game_id: number;
    created_on: Date;
  };
  const limit = 10;

  const dbScores = await db.select().from(scores).orderBy(desc(scores.score));

  const paginatedScores = dbScores.reduce(
    (acc: { [key: number]: score[] }, cur) => {
      const currentPage = Object.keys(acc).length;
      if (acc[currentPage]!.length < limit) {
        acc[currentPage]!.push(cur);
      } else {
        acc[currentPage + 1] = [cur];
      }
      return acc;
    },
    { 1: [] }
  );

  return { scores: paginatedScores[page], page: page };
};
