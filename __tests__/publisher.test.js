const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('local-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('create a publisher', async () => {
    const expected = {
      name: 'Pindy',
      city: 'Prescott',
      state: 'AZ',
      country: 'USA',
    };
    const res = await request(app).post('/api/v1/publishers').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
