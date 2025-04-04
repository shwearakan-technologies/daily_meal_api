"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meal.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Meal.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Meal",
    }
  );
  return Meal;
};
