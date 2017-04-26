var campaignUrl  = require('../models/index');
var express = require('express');
var router  = express.Router();
var db = require('../config/dbConfig.js'),
  sequelize = db.sequelize,
  Sequelize = db.Sequelize;


var log = function(inst) {
      console.dir(inst.get()) }


router.get('/:shortId', function(req, res, next) {

    campaignUrl.findOne({
    attributes: ['originalUrl'],
    where: {shortId: req.params.shortId} 
  })
    .then(function(url) {
    if (!url) {
      var error = new Error("Not FOund You idiot")
      error.status = 405
      return next(error)
    }
    
    res.status(302).redirect(url.originalUrl);
  });
});

module.exports = router;