const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router().post('/', async (req, res) => {
  const author = await Author.createAuthor({
    name: req.body.name,
    dob: req.body.dob,
    pob: req.body.pob,
  });
  res.send(author);
});
