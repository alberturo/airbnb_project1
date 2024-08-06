"use strict";

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("SpotImages", "spotId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Spots",
      },
      options,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("SpotImages", "spotId");
  },
};
