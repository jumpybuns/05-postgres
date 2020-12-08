const request = require('supertest');
const app = require('./index.js');

describe('app endpoints', () => {
  it.only('creates a new beer',
    async() => {
      const res = await request(app)
        .post('/beer')
        .send({
          'name': 'Duff',
          'mouth_feel': 'gross',
          'brewery': 'Duff Gardens'
        })
        .get('/beer');

      expect(res.body).toEqual({
        'name': 'Duff',
        'mouth_feel': 'gross',
        'brewery': 'Duff Gardens'
      });
    });
});
