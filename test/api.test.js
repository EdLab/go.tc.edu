/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

let request = require('supertest');
let app = require('../app-crud');

let chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('/rest/campaignURL', () => {
  before(function(done) {
    app.listen(8080, ()=>{
      done();
    });
  });
  var tempCampaign;
  describe('/POST Generate shortUrl from originalURL', () => {
    it('it should GET campaignURL object', (done) => {
      request(app)
        .post('/rest/campaignURL')
        .send({ originalURL: 'http://edlab.test.tc.edu', description: 'test1' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('cId');
          res.body.should.have.property('shortId');
          res.body.should.have.property('updatedAt');
          res.body.should.have.property('createdAt');
          expect(res.body.originalURL).to.equal('http://edlab.test.tc.edu');
          tempCampaign = res.body;
          done(err);
        });
    });
  });
  describe('/POST Generate shortUrl with the same originalURL', () => {
    it('it should GET 400 error', (done) => {
      request(app)
        .post('/rest/campaignURL')
        .send({ originalURL: 'http://edlab.test.tc.edu', description: 'test2' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });
  describe('/GET All campaignURLs', () => {
    it('it should return result with at least one object', (done) => {
      request(app)
        .get('/rest/campaignURL')
        .end((err, res) => {
          res.should.have.property('status');
          expect(res.status).to.equal(200);
          res.body.should.be.a('array');
          expect(res.body).to.have.length.above(0);
          done(err);
        });
    });
  });
  describe('/DELETE /:cId Delete Test campaignURLs', () => {
    it('it should be 200 and return empty object', (done) => {
      request(app)
        .delete(`/rest/campaignURL/${tempCampaign.cId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });
  describe('/GET All campaignURL', () => {
    it('it should get empty result', (done) => {
      request(app)
        .get('/rest/campaignURL')
        .end((err, res) => {
          res.should.have.property('status');
          expect(res.status).to.equal(200);
          res.body.should.be.a('array');
          expect(res.body).to.have.lengthOf(0);
          done(err);
        });
    });
  });

});
