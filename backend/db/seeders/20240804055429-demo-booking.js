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
            spotId: 1,
            userId: 1,
            startDate: new Date("2025-08-05"),
            endDate: new Date("2025-08-10"),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            spotId: 2,
            userId: 2,
            startDate: new Date("2025-09-01"),
            endDate: new Date("2025-09-07"),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            spotId: 2,
            userId: 3,
            startDate: new Date("2025-09-01"),
            endDate: new Date("2054-09-07"),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { validate: true }
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
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        userId: { [Op.lt]: 3 },
      },
      {}
    );
  },
};
