const Sequelize = require('sequelize');
const db = require('../config/dbCrud.js'),
  sequelize = db.sequelize;

var deletedURLModel = sequelize.define('deletedURL', {
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
    allowNull: false,
    unique: true,
    validate: {
      len: [3,]
    }
  },
  description:
  {
    type: Sequelize.STRING,
    defaultvalue: 'Just for FUN..',
    allowNull: true,
    unique: false
  },
  deletedAt:
  {
    type: Sequelize.DATE,
    field: 'deletedAt',
    defaultValue: function() {
      return sequelize.literal('CURRENT_TIMESTAMP');
    }
  },
  createdAt: {type: Sequelize.DATE, field: 'createdAt'}
}
}, {
  tableName: 'deletedURL',
  timestamps: false
});

module.exports = deletedURLModel;
