const Sequelize = require('sequelize');

let sequelize = new Sequelize('Express', 'root', '', {
  define: {
    freezeTableName: true,
  },
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});

let db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
