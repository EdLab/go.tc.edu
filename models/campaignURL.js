const chance = require('chance')();
const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');
const DeletedURLModel = require('./campaignURLDeleted');
const Logger = require('../libs/Logger');
const generateShortId = function(shortId = chance.word()) {
  return CampaignURLModel
    .findOne({
      where: {
        shortId: shortId
      }
    })
    .then(function(result) {
      if (result) {
        return generateShortId(chance.word());
      } else {
        return shortId;
      }
    }, function(err) {
      Logger.error(err);
      return err;
    });
};
var CampaignURLModel = sequelize.define('campaign_url', {
  cId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  originalURL: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isUrl: true
    }
  },
  shortId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, ]
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false
  }
}, {
  timestamps: true
});
CampaignURLModel
  .hook('beforeValidate', function(instance, options, done) {
    if (!instance.shortId) {
      generateShortId()
        .then((shortId) => {
          instance.shortId = shortId;
          done();
        });
    } else {
      done();
    }

  });
CampaignURLModel
  .sync() // { force: false }
  .then(function() {
    Logger.debug('Successfully synced CampaignURLModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });

// Hooks
CampaignURLModel
  .hook('beforeDestroy', function(instance, options, done) {
    DeletedURLModel
      .create({
        originalURL: instance.originalURL,
        shortId: instance.shortId,
        description: instance.description,
        createdAt: instance.createdAt
      })
      .then(function() {
        Logger.debug('Deleted successfully');
        done(null, instance);
      })
      .catch(function(err) {
        // handle error
        Logger.error('Error while deleting', err);
        done(err);
      });
  });

module.exports = CampaignURLModel;
