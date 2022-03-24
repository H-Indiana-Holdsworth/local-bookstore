const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

describe('local-bookstore book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a review', async () => {
    const expected = {
      rating: 3,
      reviewerId: '1',
      review: 'Good',
      bookId: '1',
    };

    const res = await request(app).post('/api/v1/reviews').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets 100 reviews', async () => {
    const expected = await Review.getListOfReviews();

    const res = await request(app).get('/api/v1/reviews');

    expect(res.body).toEqual(expected);
  });

  it('gets a review by id', async () => {
    const review = await Review.createReview({
      rating: 3,
      reviewerId: '1',
      review: 'Good',
      bookId: '1',
    });

    const res = await request(app).get(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual(review);
  });

  it('deletes a review by id', async () => {
    const expected = await Review.deleteReview(1);
    const res = await request(app).delete('/api/v1/reviews/1');
    expect(expected).not.toContain(res.body);
  });
});
