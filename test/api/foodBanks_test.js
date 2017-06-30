/* globals: api */
require('../helper');

const FoodBank  = require('../../models/foodBank');
const User      = require('../../models/user');

describe('Food Bank tests', () => {

  beforeEach(done => {
    FoodBank.collection.remove();
    User.collection.remove();
    done();
  });

  describe('GET /api/foodBanks', () => {

    beforeEach(done => {
      FoodBank.create({
        name: 'Battersea Food Bank',
        location: { lat: 51.0000034, lng: 1.000034 },
        type: 'Private',
        createdBy: User[0]
      }, done);
    });

    it('should return a 200 response', done => {
      api.get('/api/foodBanks')
      .set('Accept', 'application/json')
      .expect(200, done);
    });

    it('should respond with a JSON object', done => {
      api.get('/api/foodBanks')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.header['content-type']).to.be.eq('application/json; charset=utf-8');
        done();
      });
    });

    it('should return an array of Food Banks', done => {
      api.get('/api/foodBanks')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
    });

    it('should return an array of shoe objects', done => {
      api.get('/api/foodBanks')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body)
        .and.be.an('array')
        .and.have.property(0)
        .and.have.all.keys([
          'id',
          'name',
          'location',
          'type',
          'createdAt',
          'updatedAt'
        ]);
        done();
      });
    });
  });

});
