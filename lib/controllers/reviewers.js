const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res) => {
    const reviewer = await Reviewer.insert({
      name: req.body.name,
      company: req.body.company,
    });
    res.send(reviewer);
  })

  .get('/', async (req, res) => {
    const reviewer = await Reviewer.getAllReviewers();
    res.send(reviewer);
  })

  .get('/:id', async (req, res) => {
    const reviewer = await Reviewer.getReviewerById(req.params.id);
    res.send(reviewer);
  })

  .get('/:id/reviews', async (req, res) => {
    const reviewer = await Reviewer.getReviewerById(req.params.id);
    const reviewerReviews = await reviewer.getReviewsByReviewer();
    res.send(reviewerReviews);
  })

  .patch('/:id', async (req, res) => {
    const reviewer = await Reviewer.updateReviewer(req.params.id, req.body);
    res.send(reviewer);
  });
