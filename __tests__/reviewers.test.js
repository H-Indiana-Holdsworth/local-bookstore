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

  it('should get reviewers by id', async () => {
    const reviewer = await Reviewer.getReviewerById(1);

    const res = await request(app).get(`/api/v1/reviewers/${reviewer.id}`);

    expect(res.body).toEqual(reviewer);
  });

  it('updates a reviewer', async () => {
    const reviewer = await Reviewer.insert({
      name: 'james',
      company: 'bing bong',
    });

    const res = await request(app)
      .patch('/api/v1/reviewers/4')
      .send({ company: 'bing bong' });

    expect(res.body).toEqual({ id: expect.any(String), ...reviewer });
  });

  it('gets all reviews from a reviewer', async () => {
    const reviewer = await Reviewer.getReviewerById(1);
    const expected = await reviewer.getReviewsByReviewer();

    const res = await request(app).get(
      `/api/v1/reviewers/${reviewer.id}/reviews`
    );

    expect(res.body).toEqual(expected);
  });

  it('deletes a reviewer if there are no reviews', async () => {
    const reviewer = await Reviewer.deleteReviewer(3);
    const res = await request(app).delete('/api/v1/reviewers/3');
    expect(reviewer).not.toContain(res.body);
  });

  it('doesnt delete a reviewer if there are reviews', async () => {
    const res = await request(app).delete('/api/v1/reviewers/1');
    expect(res.body.message).toEqual('This reviewer cant be deleted');
  });
});
