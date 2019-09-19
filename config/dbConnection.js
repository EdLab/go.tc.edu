const fs = require('fs');
const Sequelize = require('sequelize');
const environment = process.env.NODE_ENV || 'development';
const DBConfig = require('./dbConfig.json')[environment];
const debug = require('debug')('DB:CMS');
debug(`Running with ${environment} database`);

let sequelize = new Sequelize(DBConfig.database,
  DBConfig.username,
  DBConfig.password, {
    host: DBConfig.host,
    dialect: 'mysql',
    dialectOptions: DBConfig.ssl ? {
      ssl: {
        ca: fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem')
      }
    } : null,
    logging: debug,
    pool: {
      max: 5,
      min: 0,
      idle: 30
    }
  }
);

module.exports = sequelize;
