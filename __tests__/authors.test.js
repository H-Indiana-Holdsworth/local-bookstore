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
    const author = {
      name: 'bob',
      dob: '6/15/2001',
      pob: 'Prescott',
    };

    const res = await request(app).post('/api/v1/authors').send(author);

    expect(res.body).toEqual({ id: expect.any(String), ...author });
  });

  it('gets all authors', async () => {
    const expected = await Author.getAllAuthors();
    const res = await request(app).get('/api/v1/authors');

    expect(res.body).toEqual(expected);
  });

  it('gets an author by id', async () => {
    const author = await Author.getAuthorById(1);

    const res = await request(app).get(`/api/v1/authors/${author.id}`);

    expect(res.body).toEqual(author);
  });
});
