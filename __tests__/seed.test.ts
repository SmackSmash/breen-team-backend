const db = require('../db/connection');
const data = require('../db/data/test');
const seed = require('../db/seeds/seed');
const { beforeAll } = require('');

beforeAll(() => seed(data));

describe('seed', () => {
  test('users table', () => {
    return db.select().from();
  });
});
