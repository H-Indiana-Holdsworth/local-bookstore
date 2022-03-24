const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Publisher = require('../lib/models/Publisher');

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

  it('list all publishers', async () => {
    const expected = await Publisher.getAllPublishers();
    const res = await request(app).get('/api/v1/publishers');

    expect(res.body).toEqual(expected);
  });

  it('should get a publisher by id', async () => {
    const publisher = await Publisher.getPublisherById(1);

    const res = await request(app).get(`/api/v1/publishers/${publisher.id}`);

    expect(res.body).toEqual(publisher);
  });

  it('should get books for a given publisher', async () => {
    const publisher = await Publisher.getPublisherById(1);
    const expected = await publisher.getBooksByPublisher();

    const res = await request(app).get(
      `/api/v1/publishers/${publisher.id}/books`
    );

    expect(res.body).toEqual(expected);
  });
});
