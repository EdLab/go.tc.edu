const Sequelize = require('sequelize');
let sequelize = new Sequelize('nlt_dev_local_Jan30', 'root', '', {
  define: {
	  freezeTableName: true,
  },
	  host: 'localhost',
	  port: 3306,
	  dialect: 'mysql',
});

let db = {};

db.sequelize = sequelize;

module.exports = db;
