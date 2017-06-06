/* eslint-env node, mocha */
process.env.NODE_ENV = 'testing';

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
const testToken = 'jp3vkqSD1cBCsm0cbDKB2cy4SosyK4V0wsoMm';
describe('App Redirect', () => {
  describe('/POST /rest/shortURL Specify shortId and originalURL', () => {
    it('it should GET campaignURL object', (done) => {
      request(crudApp)
        .post('/rest/shortURL')
        .set({
          'Authorization': `Bearer ${testToken}`
        })
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
  describe('/DELETE /rest/shortURL/:cId Delete Test campaignURLs', () => {
    it('it should be 200 and return empty object', (done) => {
      request(crudApp)
        .delete(`/rest/shortURL/${targetCampaignURL.cId}`)
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

});
