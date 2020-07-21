const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Library', librarySchema);
