const Book = require('../models/book');
const Library = require('../models/library');
const chance = require('chance').Chance();

module.exports = async({ booksToCreate = 100, librarysToCreate = 10 } = {}) => {
  const genre = ['fiction', 'non-fiction'];
  const authors = ['J.K. Rowling', 'Johnathan Franzen', 'Douglas Adams', 'Elizabeth Gilbert', 'John Stenibeck', 'Tony Morrison'];

  const library = await Library.create([...Array(booksToCreate)].map(() => ({
    name: `${chance.name()}'s Library`,
    address: chance.address(),
    city: 'Portland',
    state: 'OR'      
  })));

  const books = await Book.create([...Array(booksToCreate)].map(() => ({
    author: chance.pickone(authors),
    title: chance.animal() + ' ' + chance.word(),
    genre: chance.pickone(genre),
    library: chance.pickone(library)
  })));
};
