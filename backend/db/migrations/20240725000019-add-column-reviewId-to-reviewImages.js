"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("ReviewImages", "reviewId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Reviews",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("ReviewImages", "reviewId");
  },
};
