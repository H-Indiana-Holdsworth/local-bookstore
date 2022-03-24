const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router().post('/', async (req, res) => {
  const book = await Book.createBook({
    title: req.body.title,
    publisherId: req.body.publisherId,
    released: req.body.released,
  });

  res.send(book);
});
