const { Router } = require('express');
const Library = require('../../models/library');

module.exports = Router()
  .post('/', (req, res, next) => {
    Library
      .create(req.body)
      .then(library => res.send(library))
      .catch(next);
  });

