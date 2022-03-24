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
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    return new Book(rows[0]);
  }
};
