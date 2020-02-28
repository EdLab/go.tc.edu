const Sequelize = require('sequelize');
const fs = require('fs')
const rdsCa = fs.readFileSync(`${__dirname}/rds-ca-2019-root.pem`)

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_DIALECT,
  DB_SSL_ENABLED = false
} = process.env;

const debug = require('debug')('DB:CMS');
debug(`Running on database ${DB_DATABASE}`);

let sequelize = new Sequelize(DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  dialectOptions: {
    ssl: {
      ca: rdsCa,
    },
  },
  logging: debug,
  pool: {
    max: 5,
    min: 0,
    idle: 30
  }
}
);

module.exports = sequelize;