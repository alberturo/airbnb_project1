"use strict";
const { Spot } = require("../models");
let options = {};

if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 wilderness",
          city: "San Diego",
          state: "California",
          country: "USA",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "beautiful apartment",
          description: "good green place",
          price: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 1,
          address: "123 ridge",
          city: "Atlanta",
          state: "Georgia",
          country: "USA",
          lat: 38.7645358,
          lng: -121.4730327,
          name: "wild green house",
          description: "Big areas, nice backyard",
          price: 250,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          address: "123 sand",
          city: "canyon",
          state: "Florida",
          country: "USA",
          lat: 89.7645358,
          lng: 10.5512321,
          name: "big apartment",
          description: "good area",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      options
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: { [Op.lt]: 3 },
      },
      {}
    );
  },
};
