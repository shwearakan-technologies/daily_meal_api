"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Meals",
      [
        {
          category_id: 1,
          price: 5.99,
          createdAt: new Date(),
        },
        {
          category_id: 2,
          price: 7.99,
          createdAt: new Date(),
        },
        {
          category_id: 3,
          price: 10.99,
          createdAt: new Date(),
        },
        {
          category_id: 4,
          price: 12.99,
          createdAt: new Date(),
        },
        {
          category_id: 5,
          price: 3.99,
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Meals", null, {});
  },
};
