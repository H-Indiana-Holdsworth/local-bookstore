const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');

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

  it('gets all books', async () => {
    const expected = await Book.getAllBooks();
    const res = await request(app).get('/api/v1/books');
    expect(res.body).toEqual(expected);
  });

  it('gets a book by id', async () => {
    const expected = await Book.getBookById(1);
    const res = await request(app).get(`/api/v1/books/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('get authors by book id', async () => {
    const book = await Book.getBookById(1);
    const expected = await book.getAuthorByBookId();
    const res = await request(app).get(`/api/v1/books/${book.id}/authors`);

    expect(res.body).toEqual(expected);
  });

  it('gets reviews by book id', async () => {
    const book = await Book.getBookById(1);
    const expected = await book.getReviewByBookId();
    const res = await request(app).get(`/api/v1/books/${book.id}/reviews`);

    expect(res.body).toEqual(expected);
  });
});
