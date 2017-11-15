/* eslint-env node, mocha */
process.env.NODE_ENV = 'testing';

let request = require('supertest');
let crudApp = require('../app-crud');
// let crudApp = 'https://go.tc.columbia.edu'; //Prod
let chai = require('chai');
var should = chai.should();
var expect = chai.expect;
const testToken = 'jp3vkqSD1cBCsm0cbDKB2cy4SosyK4V0wsoMm';

describe('App Crud', () => {
  var server;
  describe('/rest/shortURL', () => {
    var tempCampaign;
    describe('/POST Generate shortUrl from originalURL', () => {
      it('it should GET campaignURL object', (done) => {
        request(crudApp)
          .post('/rest/shortURL')
          .set({
            'Authorization': `Bearer ${testToken}`
          })
          .send({
            originalURL: 'http://edlab.test.tc.edu',
            description: 'test1'
          })
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
        request(crudApp)
          .post('/rest/shortURL')
          .set({
            'Authorization': `Bearer ${testToken}`
          })
          .send({
            originalURL: 'http://edlab.test.tc.edu',
            description: 'test2'
          })
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
        request(crudApp)
          .get('/rest/shortURL')
          .set({
            'Authorization': `Bearer ${testToken}`
          })
          .end((err, res) => {
            res.should.have.property('status');
            expect(res.status).to.equal(200);
            res.body.should.be.a('array');
            expect(res.body).to.have.length.above(0);
            done(err);
          });
      });
      it('it should return 403 if not with token', (done) => {
        request(crudApp)
          .get('/rest/shortURL')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done(err);
          });
      });
    });
    describe('/DELETE /:cId Delete Test campaignURLs', () => {
      it('it should be 200 and return empty object', (done) => {
        request(crudApp)
          .delete(`/rest/shortURL/${tempCampaign.cId}`)
          .set({
            'Authorization': `Bearer ${testToken}`
          })
          .end((err, res) => {
            res.body.should.be.a('object');
            expect(res.status).to.equal(200);
            done(err);
          });
      });
    });
    describe('/GET All campaignURL', () => {
      it('it should get empty result', (done) => {
        request(crudApp).get('/rest/shortURL')
          .set({
            'Authorization': `Bearer ${testToken}`
          })
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
});

