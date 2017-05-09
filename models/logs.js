"use strict";

var db = require('../config/dbRedirect.js'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var logsModel = sequelize.define('logs', {
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
        }
        }, {
         tableName: 'logs'
      });

module.exports = logsModel;