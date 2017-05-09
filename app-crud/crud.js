var campaignURLModel  = require('../models/campaignURL');
var deletedURLModel = require('../models/campaignURLDeleted');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');
var epilogue = require('epilogue');
var express = require('express');
var logger = require('../libs/Logger')
var port = process.env.PORT || 9001;
var router = express.Router();
var database = new Sequelize(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS,process.env.dialect)
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
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
campaignURLModel.hook('beforeDestroy', function(campaignURLModel, options, fn){
deletedURLModel
.create({
  originalURL: campaignURLModel.originalURL,
  shortId: campaignURLModel.shortId,
  description: campaignURLModel.description
})
.then(function() {
  logger.info('Deleted successfully');
})
.catch(function(err){
  // handle error
  logger.error('Error while deleting', err);
})
fn(null, campaignURLModel)
})


// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
});

// Create REST resource
var campaignURL = epilogue.resource({
  model: campaignURLModel,
  endpoints: ['/rest/campaignURL', '/rest/campaignURL/:cId'],
  search: [
     { operator: '$eq',param: 'cId', attributes: [ 'cId' ] }
  ]
});

// Listening to port
app.listen(port, function() {
      console.log('listening at %s', port);
    });

// Create database and listen
campaignURLModel
  .sync({ force: false }) // 
  .then(function() {
    logger.info('Successfully synced campaignURLModel')
  }).catch(function(err)
  {
    // handle error
    logger.error('Error while listening to database', err);
  }
  );

deletedURLModel
  .sync() //{ force: false } 
  .then(function() {
    logger.info('Successfully synced deletedURLModel')
  }).catch(function(err)
  {
    // handle error
    logger.error('Error while listening to database', err);
  }
  );