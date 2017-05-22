const campaignURLModel = require('../models/campaignURL');
const LogsModel = require('../models/campaignLogs');
const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');

// Router for redirect request to original URL
router.get('/:shortId', function(req, res, next) {
  LogsModel
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
      Logger.info('Log successfully');
    })
    .catch(function(err) {
      // handle error
      Logger.error('Error while logging', err);
    });

  // Redirecting
  campaignURLModel.findOne({
    attributes: ['originalURL'],
    where: {
      shortId: req.params.shortId
    }
  })
    .then(function(url) {
      if (!url) {
        var error = new Error('Couldn\'t found you..');
        error.status = 405;
        Logger.error('Error while redirecting', error);
        return next(error);
      }
      Logger.info('Redirecting successful');
      res.status(301).redirect(url.originalURL);
    });
});

module.exports = router;
