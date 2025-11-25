import app from '../app';
import * as matchers from 'jest-extended';
import { beforeAll, afterAll, describe, test, expect } from 'vitest';
import seedTable from '../db/seed/seed';
import dropTable from '../db/seed/drop';
import request from 'supertest';

expect.extend(matchers);

beforeAll(() => seedTable());
afterAll(() => dropTable());

describe('GET', () => {
  describe('GET /scores', () => {
    test('GET scores from database', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/scores').expect(200);

      scores.forEach(score => {
        expect(score.score_id).toBeNumber();
        expect(score.score).toBeNumber();
        expect(score.user_id).toBeNumber();
        expect(score.username).toBeString();
        expect(score.game_id).toBeNumber();
        expect(score.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(score.created_on)
        ).toBeTrue();
      });
    });

    test('GET score sort by scores by default', async () => {
      const {
        body: { scores }
      } = await request(app).get('/api/scores').expect(200);

      for (let i = 0; i < scores.length - 1; i++) {
        expect(scores[i].score > scores[i + 1].score).toBeTrue();
      }
    });
  });

  describe('GET /users', () => {
    test('GET all users from database', async () => {
      return request(app).get("/api/users").expect(200).then(({ body }) => {
        const users = body
        users.forEach(user => {
          expect(user.user_id).toBeNumber();
          expect(user.username).toBeString();
          expect(user.created_on).toBeString();
          expect(
            /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)
          ).toBeTrue();
        });
      })
    });
    test('GET user by Id', async () => {
      return request(app).get('/api/users/1').expect(200).then(({ body }) => {
        const { user } = body
        expect(user.user_id).toBeNumber();
        expect(user.username).toBeString();
        expect(user.created_on).toBeString();
        expect(
          /^\d{4}\-\d{2}\-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/.test(user.created_on)
        ).toBeTrue();
      })
    });

  })
});

describe('POST', () => {
  describe('POST /users', () => {
    test('POST user to the database', async () => {
      const newUser = {
        user_id: 11,
        username: 'Gilson',
        created_on: 213123123
      }

      return request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          const { user } = body;
          console.log(user)
          expect(user).toHaveProperty("user_id");
          expect(user).toHaveProperty("username");
          expect(user).toHaveProperty("created_on");
          expect(typeof user).toBe("object");
          expect(typeof user.user_id).toBe("number");
          expect(typeof user.username).toBe("string");
          expect(typeof user.created_on).toBe("string");
        })
    })
  })
});


describe('DELETE', () => {
  describe('DELETE /users', () => {
    test('DELETE user by Id', async () => {
      return request(app).delete('/api/users/1').expect(204)
    })
  })
});