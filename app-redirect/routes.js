const campaignURLModel = require('../models/campaignURL');
const LogsModel = require('../models/campaignLogs');
const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');

// Router for redirect request to original URL
router.get('/', (req, res) => {
  res.json({});
});
router.get('/:shortId', function(req, res, next) {
  // var geoIp = geoip.lookup(req.ip);
  var geoIp = geoip.lookup('128.59.82.245');
  var logObject = {
    originalURL: req.protocol + '://' + req.get('host') + req.originalUrl,
    remote: req.ip,
    userAgent: req.headers['user-agent']
  };
  if (geoIp) {
    Object.assign(logObject, {
      latitude: geoIp.ll[0],
      longitude: geoIp.ll[1],
      city: geoIp.city,
      region: geoIp.region,
      country: geoIp.country,
      metroCode: geoIp.metro,
      zipCode: geoIp.zip
    });
  }
  LogsModel
    .create(logObject)
    .then(function() {
      Logger.info('Log successfully');
    })
    .catch(function(err) {
      // handle error
      Logger.error('Error while logging', err);
    });

  // Redirecting
  campaignURLModel
    .findOne({
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
      res.status(301).redirect(url.originalURL);
    });
});

module.exports = router;
