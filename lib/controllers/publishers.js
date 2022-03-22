const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router().post('/', async (req, res) => {
  const publisher = await Publisher.insert({
    name: req.body.name,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  });
  res.send(publisher);
});