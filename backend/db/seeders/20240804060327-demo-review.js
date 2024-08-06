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
            spotId: 1,
            userId: 1,
            review: "Great place, very clean and comfortable.",
            stars: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            spotId: 2,
            userId: 2,
            review: "Nice location, but the amenities could be better.",
            stars: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            userId: 2,
            spotId: 2,
            review: "Nice location but noisy.",
            stars: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { validate: true }
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
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.lt]: 4 },
      },
      {}
    );
  },
};
