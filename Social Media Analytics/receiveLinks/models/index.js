"use strict";

var db = require('../config/dbConfig.js'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;


var campaignUrl = sequelize.define('campaignUrl', {
		id: {
          type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        originalUrl: Sequelize.STRING,
        shortId: Sequelize.STRING
        }, {
         tableName: 'campaignUrl'
      });

module.exports = campaignUrl;