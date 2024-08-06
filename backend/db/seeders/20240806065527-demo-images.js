"use strict";

const { Image } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Image.bulkCreate(
      [
        {
          imageableType: "spot",
          imageableId: 1,
          url: "https://example.com/images/studio93-apartment.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 2,
          url: "https://example.com/images/luxury-loft57.jpg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "review",
          imageableId: 1,
          url: "https://example.com/images/review-1.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "review",
          imageableId: 1,
          url: "https://example.com/images/review-2.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "review",
          imageableId: 2,
          url: "https://example.com/images/review-3.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "review",
          imageableId: 3,
          url: "https://example.com/images/review-4.jpg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Images";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        imageableId: { [Op.lt]: 4 },
      },
      {}
    );
  },
};
