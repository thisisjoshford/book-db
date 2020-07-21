require('dotenv').config();
require('./lib/utils/connect')();

const seedData = require('./db/seed');

seedData({ booksToCreate: 100 })
  .then(() => console.log('done'));
