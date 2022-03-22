const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer');

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

  it('gets all reviewers', async () => {
    const expected = await Reviewer.getAllReviewers();
    const res = await request(app).get('/api/v1/reviewers');
    expect(res.body).toEqual(expected);
  });
});
