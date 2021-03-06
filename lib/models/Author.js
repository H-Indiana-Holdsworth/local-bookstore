const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = new Date(row.dob).toLocaleDateString('en-US');
    this.pob = row.pob;
  }

  static async createAuthor({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            authors (name, dob, pob)
        VALUES
            ($1, $2, $3)
        RETURNING
            *
        `,
      [name, dob, pob]
    );

    if (!rows[0]) {
      return null;
    }

    return new Author(rows[0]);
  }

  static async getAllAuthors() {
    const { rows } = await pool.query(
      `
        SELECT 
          * 
        FROM 
          authors
      `
    );

    return rows.map((row) => new Author(row));
  }

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          * 
        FROM 
          authors 
        WHERE 
          id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Author(rows[0]);
  }

  async getBookByAuthorId() {
    const { rows } = await pool.query(
      `
       SELECT 
       *
       FROM
       books
       RIGHT JOIN
       authors_books
       ON
       books.id = authors_books.books_id
       WHERE
       authors_books.author_id=$1
       `,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};
