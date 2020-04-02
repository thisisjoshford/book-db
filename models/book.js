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

bookSchema.static.genre = function() {
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

module.exports = mongoose.model('Book', bookSchema);
