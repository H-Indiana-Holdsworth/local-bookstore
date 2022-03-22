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
  });
