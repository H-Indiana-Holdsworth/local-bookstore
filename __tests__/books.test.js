const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a book', async () => {
    const expected = {
      title: 'yeet',
      publisherId: '1',
      released: 2001,
    };

    const res = await request(app).post('/api/v1/books').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
