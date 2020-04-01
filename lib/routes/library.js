const { Router } = require('express');
const Library = require('../../models/library');

module.exports = Router()
  .post('/', (req, res, next) => {
    Library
      .create(req.body)
      .then(library => res.send(library))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Library
      .findById(req.params.id)
      .then(library => res.send(library))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Library
      .find()
      .then(library => res.send(library))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Library
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(library => res.send(library))
      .catch(next);
  });


