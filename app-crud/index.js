let campaignURLModel = require('../models/campaignURL');
let deletedURLModel = require('../models/campaignURLDeleted');
let bodyParser = require('body-parser');
let Sequelize = require('sequelize');
let epilogue = require('epilogue');
let express = require('express');

let router = express.Router();
let database = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.dialect);
let app = express();

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

// Hooks
campaignURLModel
  .hook('beforeDestroy', function(campaignURLModel, options, fn) {
    deletedURLModel
      .create({
        originalURL: campaignURLModel.originalURL,
        shortId: campaignURLModel.shortId,
        description: campaignURLModel.description,
        createdAt: campaignURLModel.createdAt
      })
      .then(function() {
        Logger.info('Deleted successfully');
      })
      .catch(function(err) {
        // handle error
        Logger.error('Error while deleting', err);
      });
    fn(null, campaignURLModel);
  });


// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database,
});

// Create REST resource
let campaignURL = epilogue.resource({
  model: campaignURLModel,
  endpoints: ['/rest/campaignURL', '/rest/campaignURL/:cId'],
  search: [{
    operator: '$eq',
    param: 'cId',
    attributes: ['cId']
  }, ],
});

module.exports = app;
