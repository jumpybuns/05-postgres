const fs = require('fs');
const pool = require('./utils/pool');
const request = require('supertest');
const app = require('./app');
const Beer = require('./models/Beer');

describe('app endpoints', () => {

  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  afterAll(() => {
    return pool.end();
  });


  it('POST creates a new beer', async() => {
    const response = await request(app)
      .post('/beer')
      .send({
        'name': 'Duff',
        'mouthFeel': 'gross',
        'brewery': 'Duff Gardens'
      });
        

    expect(response.body).toEqual({
      'id' : '1',
      'name': 'Duff',
      'mouthFeel': 'gross',
      'brewery': 'Duff Gardens'
    });
  });

  it('GET to get ALLL THEE BEEEERR', async() => {
    const beer = await Beer.insert({
      'name': 'Duff',
      'mouthFeel': 'gross',
      'brewery': 'Duff Gardens'
    });

    const response = await request(app)

      .get('/beer');
      
    expect(response.body).toEqual([beer]);
  });

  it('finds a beer by id via GET', async() => {
    const beer = await Beer.insert({        

      'name': 'Duff',
      'mouthFeel': 'gross',
      'brewery': 'Duff Gardens' });

    const response = await request(app)
      .get(`/beer/${beer.id}`);

    expect(response.body).toEqual({
      'id': '1',
      'name': 'Duff',
      'mouthFeel': 'gross',
      'brewery': 'Duff Gardens'
    });
  });

  
});
