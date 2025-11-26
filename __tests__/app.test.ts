import app from '../app';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import request from 'supertest';
import { seedAPI } from '../db/seed/seedAPI';
import dropTable from '../db/seed/drop';
import { data } from '../db/data/test/index';

expect.extend(matchers);

beforeAll(() => seedAPI(data));
afterAll(async () => {
  await dropTable();
});

describe('POST', () => {
  describe('POST scores', () => {
    test('POST a score', async () => {
      const testScore = {
        score: 100,
        user_id: 1,
        username: 'testUser1'
      };

      const {
        body: { score }
      } = await request(app).post('/api/games/1/scores').send(testScore).expect(201);

      expect(score.score).toBe(100);
      expect(score.user_id).toBe(1);
      expect(score.username).toBe('testUser1');
      expect(score.game_id).toBe(1);
    });
  });
});
