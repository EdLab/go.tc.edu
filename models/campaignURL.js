"use strict";

var shortid = require('shortid');

var db = require('../config/dbCrud.js'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

// var generated_short_id = shortid.generate();

var campaignURLModel = sequelize.define('campaignURL', {
        cId: {
          type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        originalURL: 
        { 
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isUrl: true
          }
        },
        shortId: 
        {
          type: Sequelize.STRING,
          defaultValue: function() {
            return shortid.generate()
          },
          allowNull: false,
          unique: true,
          validate: {
            len: [3,]
          }
        },
        description:
        {
          type: Sequelize.STRING,
          allowNull: true,
          unique: false
        }
        }, {
         tableName: 'campaignURL'
      });

module.exports = campaignURLModel;