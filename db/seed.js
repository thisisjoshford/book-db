const Book = require('../models/Book');
const Library = require('../models/Library');
const chance = require('chance').Chance();

// specifying the number of tweets to create with our seed function
module.exports = async({ booksToCreate = 100, librarysToCreate = 10 } = {}) => {
  // creating tweets
  // creating an array of tweetsToCreate length
  // map through the array
  // -> for each item in the array we create an object with { handle, text }
  // for each tweet in the mapped array we create a tweet in our mongodb
  const genre = ['fiction', 'non-fiction'];


  const library = await Library.create([...Array(booksToCreate)].map(() => ({
    name: `${chance.name()}'s Library`,
    address: chance.address(),
    city: 'Portland',
    state: 'OR'      
  })));

  const books = await Book.create([...Array(booksToCreate)].map(() => ({
    author: chance.name(),
    title: chance.animal() + ' ' + chance.word(),
    genre: chance.pickone(genre),
    library: chance.pickone(library)
  })));
};
