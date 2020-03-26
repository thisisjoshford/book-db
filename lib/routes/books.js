const { Router } = require('express');
const Book = require('../../models/Book');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })


  .get('/:id', (req, res, next) => {
    Book
      .findById(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Book
      .find()
      .then(books => res.send(books))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Book
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(book => res.send(book))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Book
      .findByIdAndDelete(req.params.id)
      .then(book => res.send(book))
      .catch(next);
  });

