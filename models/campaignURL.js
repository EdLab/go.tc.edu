const shortid = require('shortid');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');
const DeletedURLModel = require('./campaignURLDeleted');
const Logger = require('../libs/Logger');

var CampaignURLModel = sequelize.define('campaignURL', {
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
    defaultValue: function() {
      return shortid.generate();
    },
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
  tableName: 'campaignURL'
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
