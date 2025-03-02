'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      href: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      surface: {
        type: Sequelize.STRING
      },
      prizeMoney: {
        type: Sequelize.STRING
      },
      dataInizio: {
        type: Sequelize.DATE
      },
      dataFine: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tournaments');
  }
};