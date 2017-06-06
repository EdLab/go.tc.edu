const express = require('express');
const router = express.Router();
const app = express();
const bodyParser = require('body-parser');
const epilogue = require('epilogue');
const CampaignURLModel = require('../models/campaignURL');
// const DeletedURLModel = require('../models/campaignURLDeleted');
const sequelize = require('../config/dbCrud.js');
const jenkinsConfig = require('../jenkins.json');
const API_TOKEN = 'jp3vkqSD1cBCsm0cbDKB2cy4SosyK4V0wsoMm';
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// middleware to use for all requests
router.use(function(req, res, next) {
  // Set these on header response
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  // make sure we go to the next routes and don't stop here
  next();
});

app.get('/', (req, res) => {
  res.json(jenkinsConfig);
});

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: sequelize,
});

// Create REST resource
const api = epilogue.resource({
  model: CampaignURLModel,
  endpoints: ['/rest/shortURL', '/rest/shortURL/:cId'],
  search: [{
    operator: '$eq',
    param: 'cId',
    attributes: ['cId']
  },],
});

api.all.auth(function(req, res, context) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ');
    if (token.length == 2 && token[1] == API_TOKEN) {
      return context.continue;
    } else {
      return context.stop;
    }
  } else {
    res.status(401).send({
      message: 'Unauthorized'
    });
    return context.stop;
  }
});

module.exports = app;
