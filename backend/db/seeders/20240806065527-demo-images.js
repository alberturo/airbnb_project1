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
          url: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 1,
          url: "https://images.pexels.com/photos/105294/pexels-photo-105294.jpeg",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 1,
          url: "https://images.pexels.com/photos/3209049/pexels-photo-3209049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 1,
          url: "https://images.pexels.com/photos/26859048/pexels-photo-26859048/free-photo-of-view-of-a-luxurious-villa-with-a-swimming-pool-in-the-evening.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 1,
          url: "https://images.pexels.com/photos/28311445/pexels-photo-28311445/free-photo-of-a-pool-with-a-lounge-chair-and-palm-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 2,
          url: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
          preview: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 2,
          url: "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 2,
          url: "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 2,
          url: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          imageableType: "spot",
          imageableId: 3,
          url: "https://images.pexels.com/photos/10511470/pexels-photo-10511470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          preview: true,
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
