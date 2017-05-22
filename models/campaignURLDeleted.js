const Sequelize = require('sequelize');
const sequelize = require('../config/dbCrud.js');

var DeletedURLModel = sequelize.define('campaignURLDeleted', {
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
    defaultvalue: 'Just for FUN..',
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
    Logger.info('Successfully synced deletedURLModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });
module.exports = DeletedURLModel;
