const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');

var LogsModel = sequelize.define('campaignLogs', {
  logsId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  originalURL:
  {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  IP:
  {
    type: Sequelize.STRING,
    allowNull: false
  },
  userAgent:
  {
    type: Sequelize.STRING,
    allowNull: false
  },
  latitude:
  {
    type: Sequelize.FLOAT
  },
  longitude:
  {
    type: Sequelize.FLOAT
  },
  city:
  {
    type: Sequelize.STRING
  },
  region:
  {
    type: Sequelize.STRING
  },
  country:
  {
    type: Sequelize.STRING
  },
  metroCode:
  {
    type: Sequelize.INTEGER
  },
  zipCode:
  {
    type: Sequelize.INTEGER
  },
  createdAt:
  {
    type: Sequelize.DATE,
    field: 'createdAt',
    defaultValue: function() {
      return sequelize.literal('CURRENT_TIMESTAMP');
    }
  }
}, {
  tableName: 'campaignLogs',
  timestamps: false
});

LogsModel
  .sync() // { force: false }
  .then(function() {
    Logger.info('Successfully synced logsModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });

module.exports = LogsModel;
