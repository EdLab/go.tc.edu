"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable('campaignUrl', {
        id: {
          type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        originalUrl: {
          type: Sequelize.STRING
        },
        shortId: Sequelize.STRING,
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: Sequelize.DATE
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .dropTable('campaignUrl');
  }
};