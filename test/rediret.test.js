/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

let request = require('supertest');
let crudApp = require('../app-crud');
let redirectApp = require('../app-redirect');
let chai = require('chai');
var should = chai.should();
var expect = chai.expect;

var targetCampaignURL = {
  originalURL: 'https://edlab.tc.edu',
  shortId: 'testShortId'
};

describe('App Redirect', () => {
  describe('/POST /rest/campaignURL Specify shortId and originalURL', () => {
    it('it should GET campaignURL object', (done) => {
      request(crudApp)
        .post('/rest/campaignURL')
        .send(targetCampaignURL)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('cId');
          res.body.should.have.property('shortId');
          expect(res.body.shortId).to.equal(targetCampaignURL.shortId);
          res.body.should.have.property('updatedAt');
          res.body.should.have.property('createdAt');
          expect(res.body.originalURL).to.equal(targetCampaignURL.originalURL);
          targetCampaignURL = res.body;
          done(err);
        });
    });
  });
  describe(`/GET /${targetCampaignURL.shortId} redirect`, () => {
    it('it should be 200 and return empty object', (done) => {
      request(redirectApp)
        .get(`/${targetCampaignURL.shortId}`)
        .end((err, res) => {
          expect(res.status).to.equal(301);
          done(err);
        });
    });
  });
  describe('/DELETE /rest/campaignURL/:cId Delete Test campaignURLs', () => {
    it('it should be 200 and return empty object', (done) => {
      request(crudApp)
        .delete(`/rest/campaignURL/${targetCampaignURL.cId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          expect(res.status).to.equal(200);
          done(err);
        });
    });
  });

});
