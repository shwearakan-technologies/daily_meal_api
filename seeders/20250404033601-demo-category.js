"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Breakfast",
          description: "Start your day with a healthy breakfast",
          createdAt: new Date(),
        },
        {
          name: "Brunch",
          description: "A delightful mix of breakfast and lunch",
          createdAt: new Date(),
        },
        {
          name: "Lunch",
          description: "A hearty meal to keep you going",
          createdAt: new Date(),
        },
        {
          name: "Dinner",
          description: "A satisfying end to your day",
          createdAt: new Date(),
        },
        {
          name: "Snack",
          description: "Light bites for any time of the day",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
