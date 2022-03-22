const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

describe('local-bookstore author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('create an author', async () => {
    const author = { name: 'bob', dob: '06/15/2001', pob: 'Prescott' };

    const res = request(app).post('/api/v1/authors').send(author);

    expect(res.body).toEqual({ id: expect.any(String), ...author });
  });
});
