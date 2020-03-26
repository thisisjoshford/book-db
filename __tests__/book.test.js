const { getBook } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('app routes', () => {

  it('creates a a book', () => {
    return request(app)
      .post('/api/v1/books')
      .send({
        author: 'Hanna French',
        title: 'Broken Harbor',
        genre: 'fiction'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          author: 'Hanna French',
          title: 'Broken Harbor',
          genre: 'fiction',
          __v: 0
        });
      });
  });

  it('gets a book by id', async() => {
    const book = await getBook();
    console.log(book);

    return request(app)
      .get(`/api/v1/books/${book._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...book,
        });
      });
  });
});
