const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router().post('/', async (req, res) => {
  const review = await Review.createReview({
    rating: req.body.rating,
    reviewerId: req.body.reviewerId,
    review: req.body.review,
    bookId: req.body.bookId,
  });

  res.send(review);
});
