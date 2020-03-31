const { getLibrary } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('app routes', () => {

  it('creates a a library', async() => {
  
    return request(app)
      .post('/api/v1/library')
      .send({ 
        name: 'Central Library',
        address: '1234 main St.',
        city: 'Portland',
        state: 'OR'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Central Library',
          address: '1234 main St.',
          city: 'Portland',
          state: 'OR',
          __v: 0
        });
      });
  });
});
