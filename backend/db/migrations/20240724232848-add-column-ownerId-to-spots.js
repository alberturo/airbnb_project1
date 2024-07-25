"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Spots", "ownerId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Spots", "ownerId");
  },
};
