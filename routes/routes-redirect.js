// Importing modules
var campaignURLModel  = require('../models/campaignURL');
var logsModel = require('../models/logs');
var express = require('express');
var router  = express.Router();
var geoip = require('geoip-lite');
var logger = require('../libs/Logger')
var db = require('../config/dbRedirect.js'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;

// Router for redirect request to original URL
router.get('/:shortId', function(req, res, next) {

    // dummy IP for testing purpose
    var reqip = '128.59.82.245'

    logsModel
    .create({
      originalURL: req.protocol + '://' + req.get('host') + req.originalUrl,
      IP: req.ip,
      userAgent: req.headers['user-agent'],
      latitude: geoip.lookup(req.ip).ll[0],
      longitude: geoip.lookup(req.ip).ll[1],
      city: geoip.lookup(req.ip).city, 
      region: geoip.lookup(req.ip).region,
      country: geoip.lookup(req.ip).country,
      metroCode: geoip.lookup(req.ip).metro,
      zipCode: geoip.lookup(req.ip).zip
    })
    .then(function() {
      logger.info('Log successfully');
    })
    .catch(function(err){
      // handle error
      logger.error('Error while logging', err);
    });

    // Redirecting
    campaignURLModel.findOne({
    attributes: ['originalURL'],
    where: {shortId: req.params.shortId} 
  })
    .then(function(url) {
    if (!url) {
      var error = new Error("Couldn't found you..")
      error.status = 405
      logger.error('Error while redirecting', err);
      return next(error)
    }
    logger.info('Redirecting successful');
    res.status(301).redirect(url.originalURL);
  });
});

module.exports = router;