const Book = require('../models/Book');
const Library = require('../models/Library');
const chance = require('chance').Chance();

module.exports = async({ booksToCreate = 100, librarysToCreate = 10 } = {}) => {
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
