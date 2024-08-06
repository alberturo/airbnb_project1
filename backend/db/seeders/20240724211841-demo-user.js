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
          email: "paula@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          username: "PaulaBeth",
        },
        {
          firstName: "Emma",
          lastName: "Joy",
          hashedPassword: bcrypt.hashSync("password2"),
          email: "emma@user.io",
          username: "EmmaJoy",
        },
        {
          firstName: "Lucas",
          lastName: "Mark",
          hashedPassword: bcrypt.hashSync("password3"),
          email: "lucas@user.io",
          username: "LucasMark",
        },
        {
          firstName: "Demo",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("password"),
          email: "demo@user.io",
          username: "Demo-lition",
        },
        {
          firstName: "Fake",
          lastName: "User",
          hashedPassword: bcrypt.hashSync("password2"),
          email: "user1@user.io",
          username: "FakeUser1",
        },
        {
          firstName: "John",
          lastName: "Doe",
          hashedPassword: bcrypt.hashSync("password3"),
          email: "user2@user.io",
          username: "FakeUser2",
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
        username: { [Op.in]: ["PaulaBeth", "EmmaJoy", "LucasMark"] },
      },
      {}
    );
  },
};
