const shortid = require('shortid');
const Sequelize = require('sequelize');
const db = require('../config/dbCrud.js'),
  sequelize = db.sequelize;

// var generated_short_id = shortid.generate();

var campaignURLModel = sequelize.define('campaignURL', {
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
// Create database and listen
campaignURLModel
  .sync({
    force: false
  }) //
  .then(function() {
    Logger.info('Successfully synced campaignURLModel');
  }).catch(function(err) {
    // handle error
    Logger.error('Error while listening to database', err);
  });
module.exports = campaignURLModel;
