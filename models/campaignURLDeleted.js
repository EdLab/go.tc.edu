const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');
const Logger = require('../libs/Logger');

var DeletedURLModel = sequelize.define('campaignURLDeleted', {
  cId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  originalURL: {
    type: Sequelize.STRING,
    allowNull: false,
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
  tableName: 'campaignURLDeleted',
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
