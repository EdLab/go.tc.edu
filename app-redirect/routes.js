// Importing modules
const Sequelize = require('sequelize');
const campaignURLModel  = require('../models/campaignURL');
const logsModel = require('../models/logs');
const express = require('express');
const router  = express.Router();
const geoip = require('geoip-lite');
const logger = require('../libs/Logger');
const db = require('../config/dbRedirect.js');
const sequelize = db.sequelize;

// Router for redirect request to original URL
router.get('/:shortId', function(req, res, next) {

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
        var error = new Error('Couldn\'t found you..');
        error.status = 405;
        logger.error('Error while redirecting', err);
        return next(error);
      }
      logger.info('Redirecting successful');
      res.status(301).redirect(url.originalURL);
    });
});

module.exports = router;
