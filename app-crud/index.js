const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const epilogue = require('epilogue');
const CampaignURLModel = require('../models/campaignURL');
// const DeletedURLModel = require('../models/campaignURLDeleted');
const sequelize = require('../config/dbCrud.js');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// middleware to use for all requests
router.use(function(req, res, next) {
  // Set these on header response
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  // make sure we go to the next routes and don't stop here
  next();
});
router.get('/', (req, res) => {
  res.json({});
});
// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: sequelize,
});

// Create REST resource
epilogue.resource({
  model: CampaignURLModel,
  endpoints: ['/rest/campaignURL', '/rest/campaignURL/:cId'],
  search: [{
    operator: '$eq',
    param: 'cId',
    attributes: ['cId']
  }, ],
});

module.exports = app;
