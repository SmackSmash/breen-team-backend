import { beforeAll, afterAll, describe, test, expect } from 'vitest'
import db from '../db/connection';
import { seed } from '../db/seed';
import { usersTable } from '../db/data/schema';

beforeAll(() => seed());
afterAll(() => db.$client.end());

describe('Seed users table', () => {
    test('should check if users table has the correct fields and values', () => {
        return db.select().from(usersTable).then((users) => {
            users.forEach((user) => {
                expect(user).toHaveProperty('user_id');
                expect(user).toHaveProperty('username');
                expect(user).toHaveProperty('created_on');
            })
        })
    });
});

