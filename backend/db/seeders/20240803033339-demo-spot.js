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
          address: "123 Main St",
          city: "Santa Marta",
          state: "Florida",
          country: "USA",
          lat: 37.7749,
          lng: -122.4194,
          name: `House in the beach`,
          description: `Rest in front of the beach - A Sunshine paradase!\n\n
         Take your family to this beautiful and white house in front of the beach`,
          price: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 2,
          address: "456 Oak St",
          city: "San Antonio",
          state: "Texas",
          country: "USA",
          lat: 34.0522,
          lng: -118.2437,
          name: "Green house",
          description: `Stay at peaceful green house - Where Nature Meets Iconic Style\n\n
          Welcome to out home, a stunning fusion of modern design and timeless elegance. Nestled in one of San Antonio's most exclusive neighborhoods, this palatial home offers over-the-top amenities and world-class views. Boasting multiple bedrooms, a grand indoor pool, a state-of-the-art recording studio, and sprawling outdoor spaces.`,
          price: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ownerId: 3,
          address: "039 Air House",
          city: "Calgary",
          state: "Alberta",
          country: "Canada",
          lat: 35.0943,
          lng: -110.7315,
          name: "The house on the air",
          description: `Stay at the Iconic air house - A Dream Come True\n\n
          Welcome to the world-famous casa en el aire, your home away from home as you embark on your journey! Centrally located in every major region, this bright and spacious facility offers everything a visitor could need. Enjoy comfortable beds, access to the latest healing technology, and a friendly staff that's always ready to assist.`,
          price: 90,
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
