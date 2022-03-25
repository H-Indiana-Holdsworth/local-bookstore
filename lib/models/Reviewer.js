const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewers (name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );
    if (!rows[0]) {
      return null;
    }
    return new Reviewer(rows[0]);
  }

  static async getAllReviewers() {
    const { rows } = await pool.query('SELECT * FROM reviewers');
    return rows.map((row) => new Reviewer(row));
  }

  static async getReviewerById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        reviewers
      WHERE
        id=$1
      `,
      [id]
    );

    if (!rows[0]) return null;

    return new Reviewer(rows[0]);
  }

  static async updateReviewer(id, attributes) {
    const currentReviewer = await Reviewer.getReviewerById(id);

    const { name, company } = { ...currentReviewer, ...attributes };

    const { rows } = await pool.query(
      `
      UPDATE 
      reviewers
      SET
      name=$2, company=$3
      WHERE
      id=$1
      RETURNING
      *
      `,
      [id, name, company]
    );

    if (!currentReviewer) {
      const error = new Error(`Knife ${id} not found`);
      error.status = 404;
      throw error;
    }

    return new Reviewer(rows[0]);
  }

  async getReviewsByReviewer() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      reviews
      LEFT JOIN
      reviewers_reviews
      ON
      reviews.id = reviewers_reviews.review_id
      WHERE
      reviewers_reviews.reviewer_id=$1
      `,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }

  static async deleteReviewer(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviewers WHERE id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }
};
