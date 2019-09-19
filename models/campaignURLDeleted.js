const Sequelize = require('sequelize');
const sequelize = require('../config/dbConnection.js');
const Logger = require('../libs/Logger');

var DeletedURLModel = sequelize.define('campaign_deleted_url', {
  cId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  originalURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  shortId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    defaultvalue: 'Just another campaign..',
    allowNull: true,
    unique: false
  },
  deletedAt: {
    type: Sequelize.DATE,
    field: 'deletedAt',
    defaultValue: function() {
      return sequelize.literal('CURRENT_TIMESTAMP');
    }
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'createdAt'
  }
}, {
  timestamps: false
});

DeletedURLModel
  .sync() // { force: false }
  .then(function() {
    Logger.debug('Successfully synced DeletedURLModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });
module.exports = DeletedURLModel;
