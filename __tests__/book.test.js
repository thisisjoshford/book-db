const { getBook, getBooks, getLibrary } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a a book', async() => {
    const library = await getLibrary();
    return request(app)
      .post('/api/v1/books')
      .send({
        author: 'Hanna French',
        title: 'Broken Harbor',
        genre: 'fiction',
        library: library 
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          author: 'Hanna French',
          title: 'Broken Harbor',
          genre: 'fiction',
          library: library._id,
          __v: 0
        });
      });
  });

  it('gets a book by id', async() => {
    const book = await getBook();
    // console.log(book);
    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...book,
        });
      });
  });

  it('gets all the books', async() => {
    const books = await getBooks();
    return request(app)
      .get('/api/v1/books')
      .then(res => {
        expect(res.body).toEqual(books);
      });
  });

  it('updates a book by id', async() => {
    const book = await getBook();

    return request(app)
      .patch(`/api/v1/books/${book._id}`)
      .send({ author: 'Stephen King' })
      .then(res => {
        expect(res.body).toEqual({
          ...book,
          author: 'Stephen King'
        });
      });
  });

  it('deletes a book by id', async() => {
    const book = await getBook();
    
    return request(app)
      .delete(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual(book);
      });
  });

  it('gets a count of genres', async() => {
    return request(app)
      .get('/api/v1/books/genres')
      .then(res => {
        console.log(res.body);
        expect(res.body).toContainEqual(
          { 
            _id: 'non-fiction', 
            count: expect.any(Number)
          }
        );
        expect(res.body).toContainEqual(
          { 
            _id: 'fiction', 
            count: expect.any(Number)
          }
        );
      });
  });

  it('gets authors sorted by number of books written', async() => {
    return request(app)
      .get('/api/v1/books/topAuthor')
      .then(res => {
        // console.log(res.body);
        expect(res.body).toEqual([
          { 
            _id: expect.any(String),
            count: expect.any(Number) 
          }, 
          { 
            _id: expect.any(String),
            count: expect.any(Number)
          },
          { 
            _id: expect.any(String),
            count: expect.any(Number) 
          }, 
          { 
            _id: expect.any(String),
            count: expect.any(Number)
          },
          { 
            _id: expect.any(String),
            count: expect.any(Number) 
          }, 
          { 
            _id: expect.any(String),
            count: expect.any(Number)
          }
        ]);
      });
  });

});
