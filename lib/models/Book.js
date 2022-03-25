const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisherId;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisherId = row.publisher_id;
    if (row.name) {
      this.publisher = { id: row.publisher_id, name: row.name };
    }
    this.released = row.released;
  }

  static async createBook({ title, publisherId, released }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            books (title, publisher_id, released)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [title, publisherId, released]
    );

    if (!rows[0]) return null;

    return new Book(rows[0]);
  }

  static async getAllBooks() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `
      SELECT 
      books.*,
      publishers.name AS name
      FROM 
      books 
      RIGHT JOIN
      publishers
      ON
      books.publisher_id = publishers.id
      WHERE 
      books.id=$1
      `,
      [id]
    );
    return new Book(rows[0]);
  }

  async getAuthorByBookId() {
    const { rows } = await pool.query(
      `
    SELECT 
    * 
    FROM
    authors
    LEFT JOIN
    authors_books
    ON
    authors.id = authors_books.author_id
    WHERE authors_books.books_id=$1
    `,
      [this.id]
    );
    this.authors = rows;
    return this;
  }

  async getReviewByBookId() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      reviews
      RIGHT JOIN
      books_reviews
      ON
      reviews.id = books_reviews.review_id
      WHERE
      books_reviews.book_id=$1
      `,
      [this.id]
    );

    this.reviews = rows;
    return this;
  }

  // async getAllBookInfo(id) {
  //   console.log(id);
  //   const book = await Book.getBookById(id);
  //   const bookAuthors = await book.getAuthorByBookId();
  //   const bookAll = await bookAuthors.getReviewByBookId();

  // const { rows } = await pool.query(
  //   `
  //   SELECT
  //   books.*,
  //   publishers.name AS name
  //   FROM
  //   books
  //   RIGHT JOIN
  //   publishers
  //   ON
  //   books.publisher_id = publishers.id
  //   LEFT JOIN
  //   authors_books
  //   ON
  //   authors.id = authors_books.author_id
  //   RIGHT JOIN
  //   books_reviews
  //   ON
  //   reviews.id = books_reviews.review_id
  //   WHERE
  //   books.id=$1
  //   `,
  //   [this.id]
  // );
  // this.all = rows;
  //   return new Book(bookAll);
  // }
};
