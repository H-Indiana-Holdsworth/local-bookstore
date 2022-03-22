const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore reviewer routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a reviewer', async () => {
    const expected = {
      name: 'Dobby',
      company: 'Pindy LLC',
    };
    const res = await request(app).post('/api/v1/reviewers').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
