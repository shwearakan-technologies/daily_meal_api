"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Ingredients",
      [
        {
          meal_id: 6,
          name: "Chicken",
          taste: "Savory",
          createdAt: new Date(),
        },
        {
          meal_id: 7,
          name: "Beef",
          taste: "Savory",
          createdAt: new Date(),
        },
        {
          meal_id: 8,
          name: "Pasta",
          taste: "Savory",
          createdAt: new Date(),
        },
        {
          meal_id: 9,
          name: "Salad",
          taste: "Fresh",
          createdAt: new Date(),
        },
        {
          meal_id: 10,
          name: "Rice",
          taste: "Savory",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Ingredients", null, {});
  },
};
