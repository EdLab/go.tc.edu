const shortid = require('shortid');
const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');

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
    Logger.info('Successfully synced campaignURLModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });
module.exports = CampaignURLModel;
