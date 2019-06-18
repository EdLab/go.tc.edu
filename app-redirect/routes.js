const CampaignURLModel = require('../models/campaignURL');
const LogsModel = require('../models/campaignLogs');
const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');

// Router for redirect request to original URL
router.get('/', (req, res) => {
  res.send('If you have any question, email us edlabit (at) tc.edu');
});

const findCampaignUrl = (req, res, next) => {
  CampaignURLModel
    .findOne({
      where: {
        shortId: req.params.shortId
      }
    })
    .then(function(campaignURL) {
      res.locals.campaignURL = campaignURL;
      next();
    });
};
router.get('/:shortId', findCampaignUrl, function(req, res, next) {
  var campaignURL = res.locals.campaignURL;
  if (campaignURL) {
    var geoIp = geoip.lookup(req.ip);
    var logObject = {
      cId: campaignURL ? campaignURL.cId : null,
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
    logObject.referer = req.headers.referer;
    LogsModel
      .create(logObject)
      .then(() => {
        return res.redirect(301, campaignURL.originalURL);
      })
      .catch((error) => {
        Logger.error('Error while redirecting', error);
        res.internalError();
      });
  } else {
    next(new Error('Not Found'));
  }
});
router.get('*', function(req, res, next) {
  next(new Error('Not Found'));
});

module.exports = router;
