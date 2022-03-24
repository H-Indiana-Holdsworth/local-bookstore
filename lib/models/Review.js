const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  reviewerId;
  bookId;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewerId = row.reviewer_id;
    this.bookId = row.book_id;
  }

  static async createReview({ rating, review, reviewerId, bookId }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
            reviews (rating, review, reviewer_id, book_id)
        VALUES
            ($1, $2, $3, $4)
        RETURNING
            *
        `,
      [rating, review, reviewerId, bookId]
    );

    if (!rows[0]) return null;

    return new Review(rows[0]);
  }
};
