"use strict";

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
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
  
  return campaignUrl;
};

