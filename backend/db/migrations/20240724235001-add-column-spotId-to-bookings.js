"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Bookings", "spotId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Spots",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Bookings", "spotId");
  },
};
