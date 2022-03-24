const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.createBook({
      title: req.body.title,
      publisherId: req.body.publisherId,
      released: req.body.released,
    });

    res.send(book);
  })

  .get('/', async (req, res) => {
    const book = await Book.getAllBooks();
    res.send(book);
  })

  .get('/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    res.send(book);
  });