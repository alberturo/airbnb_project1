"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Reviews", "spotId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Spots",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Reviews", "spotId");
  },
};
