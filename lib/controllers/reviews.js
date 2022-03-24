const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res) => {
    const review = await Review.createReview({
      rating: req.body.rating,
      reviewerId: req.body.reviewerId,
      review: req.body.review,
      bookId: req.body.bookId,
    });

    res.send(review);
  })

  .get('/', async (req, res) => {
    const reviews = await Review.getListOfReviews();

    res.send(reviews);
  })

  .get('/:id', async (req, res) => {
    const review = await Review.getReviewById(req.params.id);
    res.send(review);
  })

  .delete('/:id', async (req, res) => {
    const review = await Review.deleteReview(req.params.id);
    res.send(review);
  });
