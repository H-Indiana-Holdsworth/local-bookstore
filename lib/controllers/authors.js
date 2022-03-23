const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.createAuthor({
      name: req.body.name,
      dob: req.body.dob,
      pob: req.body.pob,
    });
    res.send(author);
  })

  .get('/', async (req, res) => {
    const authors = await Author.getAllAuthors();
    res.send(authors);
  })

  .get('/:id', async (req, res) => {
    const author = await Author.getAuthorById(req.params.id);
    res.send(author);
  });
