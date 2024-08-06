"use strict";
const { Booking } = require("../models");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Booking.bulkCreate(
        [
          {
            spotId: 1, // Ensure this spot exists
            userId: 1, // Ensure this user exists
            startDate: new Date("2024-08-05"),
            endDate: new Date("2024-08-10"),
          },
          {
            spotId: 2, // Ensure this spot exists
            userId: 2, // Ensure this user exists
            startDate: new Date("2024-09-01"),
            endDate: new Date("2024-09-07"),
          },
          {
            spotId: 2, // Ensure this spot exists
            userId: 3, // Ensure this user exists
            startDate: new Date("2024-09-01"),
            endDate: new Date("2024-09-07"),
          },
        ],
        options
      );
    } catch (error) {
      console.error("Error seeding Bookings:", error);
      if (error.errors) {
        error.errors.forEach((err) => {
          console.error(`${err.path}: ${err.message}`);
        });
      }
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkDelete(options, {});
  },
};
