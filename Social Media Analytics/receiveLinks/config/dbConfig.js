var Sequelize = require('sequelize');

var sequelize = new Sequelize('Express', 'root', '', {
	define: {
	  freezeTableName: true
	},
	  host: 'localhost',
	  port: 3306,
	  dialect: 'mysql'
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;