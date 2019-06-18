const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');
const Logger = require('../libs/Logger');
const CampaignURLModel = require('./campaignURL');

var LogsModel = sequelize.define('campaign_log', {
  logId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  cId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  remote: {
    type: Sequelize.STRING,
    allowNull: false
  },
  referer: {
    type: Sequelize.STRING,
  },
  userAgent: {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  city: {
    type: Sequelize.STRING
  },
  region: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  metroCode: {
    type: Sequelize.INTEGER
  },
  zipCode: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true,
  updatedAt: false
});
LogsModel.belongsTo(CampaignURLModel, {
  foreignKey: 'cId'
});
LogsModel
  .sync() // { force: false }
  .then(function() {
    Logger.debug('Successfully synced LogsModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });

module.exports = LogsModel;
