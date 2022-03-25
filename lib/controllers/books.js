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
  })

  .get('/:id/authors', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    const bookAuthors = await book.getAuthorByBookId();

    res.send(bookAuthors);
  })

  .get('/:id/reviews', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    const bookReviews = await book.getReviewByBookId();

    res.send(bookReviews);
  })

  .get('/:id/all', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    const bookAuthors = await book.getAuthorByBookId();
    const bookAll = await bookAuthors.getReviewByBookId();

    res.send(bookAll);
  });
