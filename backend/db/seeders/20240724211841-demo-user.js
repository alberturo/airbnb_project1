"use strict";
const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Paula",
          lastName: "Beth",
          hashedPassword: bcrypt.hashSync("password"),
          email: "paula@user.io",
        },
        {
          firstName: "Emma",
          lastName: "Joy",
          hashedPassword: bcrypt.hashSync("password2"),
          email: "emma@user.io",
        },
        {
          firstName: "Lucas",
          lastName: "Mark",
          hashedPassword: bcrypt.hashSync("password3"),
          email: "lucas@user.io",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        firstName: { [Op.in]: ["Paula", "Emma", "Lucas"] },
      },
      {}
    );
  },
};
