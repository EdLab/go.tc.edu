/* eslint-env node, mocha */
process.env.NODE_ENV = 'test';

let request = require('supertest');
let crudApp = require('../app-crud');
let redirectApp = require('../app-redirect');

let chai = require('chai');
var should = chai.should();
var expect = chai.expect;

const DeletedURLModel = require('../models/campaignURLDeleted');

var targetCampaignURL = {
  originalURL: 'https://edlab.tc.edu',
  shortId: 'home'
};

// describe('App Crud', () => {
//   var server;
//   before((done) => {
//     server = crudApp.listen(8080, () => {
//       done();
//     });
//   });
//   describe('/rest/campaignURL', () => {
//     var tempCampaign;
//     describe('/POST Generate shortUrl from originalURL', () => {
//       it('it should GET campaignURL object', (done) => {
//         request(crudApp)
//           .post('/rest/campaignURL')
//           .send({
//             originalURL: 'http://edlab.test.tc.edu',
//             description: 'test1'
//           })
//           .end((err, res) => {
//             res.body.should.be.a('object');
//             res.body.should.have.property('cId');
//             res.body.should.have.property('shortId');
//             res.body.should.have.property('updatedAt');
//             res.body.should.have.property('createdAt');
//             expect(res.body.originalURL).to.equal('http://edlab.test.tc.edu');
//             tempCampaign = res.body;
//             done(err);
//           });
//       });
//     });
//     describe('/POST Generate shortUrl with the same originalURL', () => {
//       it('it should GET 400 error', (done) => {
//         request(crudApp)
//           .post('/rest/campaignURL')
//           .send({
//             originalURL: 'http://edlab.test.tc.edu',
//             description: 'test2'
//           })
//           .end((err, res) => {
//             res.body.should.be.a('object');
//             res.body.should.have.property('message');
//             expect(res.status).to.equal(400);
//             done(err);
//           });
//       });
//     });
//     describe('/GET All campaignURLs', () => {
//       it('it should return result with at least one object', (done) => {
//         request(crudApp)
//           .get('/rest/campaignURL')
//           .end((err, res) => {
//             res.should.have.property('status');
//             expect(res.status).to.equal(200);
//             res.body.should.be.a('array');
//             expect(res.body).to.have.length.above(0);
//             done(err);
//           });
//       });
//     });
//     describe('/DELETE /:cId Delete Test campaignURLs', () => {
//       it('it should be 200 and return empty object', (done) => {
//         request(crudApp)
//           .delete(`/rest/campaignURL/${tempCampaign.cId}`)
//           .end((err, res) => {
//             res.body.should.be.a('object');
//             expect(res.status).to.equal(200);
//             done(err);
//           });
//       });
//     });
//     describe('/GET All campaignURL', () => {
//       it('it should get empty result', (done) => {
//         request(crudApp)
//           .get('/rest/campaignURL')
//           .end((err, res) => {
//             res.should.have.property('status');
//             expect(res.status).to.equal(200);
//             res.body.should.be.a('array');
//             expect(res.body).to.have.lengthOf(0);
//             done(err);
//           });
//       });
//     });
//     describe('/POST Specify shortId and originalURL', () => {
//       it('it should GET campaignURL object', (done) => {
//         request(crudApp)
//           .post('/rest/campaignURL')
//           .send(targetCampaignURL)
//           .end((err, res) => {
//             res.body.should.be.a('object');
//             res.body.should.have.property('cId');
//             res.body.should.have.property('shortId');
//             expect(res.body.shortId).to.equal(targetCampaignURL.shortId);
//             res.body.should.have.property('updatedAt');
//             res.body.should.have.property('createdAt');
//             expect(res.body.originalURL).to.equal(targetCampaignURL.originalURL);
//             targetCampaignURL = res.body;
//             done(err);
//           });
//       });
//     });
//   });
//   after((done) => {
//     server.close(() => {
//       done();
//     });
//   });
// });

describe('App Redirect', () => {
  var server;
  before(function(done) {
    server = redirectApp.listen(8080, () => {
      done();
    });
  });
  describe('redirect', () =>{
    it('it should be 200 and return empty object', (done) => {
      console.dir(targetCampaignURL.shortId);
      request(redirectApp)
       .get(`/${targetCampaignURL.shortId}`)
          .end((err, res) => {
            console.dir(res);
            // res.body.should.be.a('object');
            // res.body.should.have.property('cId');
            // res.body.should.have.property('shortId');
            // expect(res.body.shortId).to.equal(targetCampaignURL.shortId);
            // res.body.should.have.property('updatedAt');
            // res.body.should.have.property('createdAt');
            // expect(res.body.originalURL).to.equal(targetCampaignURL.originalURL);
            done(err);
          });
    });
  });

  before(function(done) {
    server.close(() => {
      done();
    });
  });
});
