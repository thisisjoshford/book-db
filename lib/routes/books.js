const { Router } = require('express');
const Book = require('../../models/Book');

module.exports = Router()
  .post('/', (req, res, next) => {
    Book
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
});
