const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    enum: ['fiction', 'non-fiction']
  },
  library:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'library',
    required: true
  }
});

bookSchema.statics.genreSort = function() {
  return this
    .aggregate([
      {
        '$group': {
          '_id': '$genre', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }
    ]);
};

bookSchema.statics.topAuthor = function() {
  return this
    .aggregate([
      {
        '$group': {
          '_id': '$author', 
          'count': {
            '$sum': 1
          }
        }
      }, {
        '$sort': {
          'count': -1
        }
      }
    ]);
};

module.exports = mongoose.model('Book', bookSchema);
