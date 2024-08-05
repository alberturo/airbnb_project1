"use strict";
const { Review } = require("../models");
let options = {};
/** @type {import('sequelize-cli').Migration} */
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(
        [
          {
            spotId: 1, // Ensure this spot exists
            userId: 1, // Ensure this user exists
            review: "Great place, very clean and comfortable.",
            stars: 5,
          },
          {
            spotId: 2, // Ensure this spot exists
            userId: 2, // Ensure this user exists
            review: "Nice location, but the amenities could be better.",
            stars: 3,
          },
        ],
        options
      );
    } catch (error) {
      console.error("Error seeding Reviews:", error);
      if (error.errors) {
        error.errors.forEach((err) => {
          console.error(`${err.path}: ${err.message}`);
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
