const db = require("../models");
const { handleResponse } = require("../utils/handleResponse");
const { handleError } = require("../utils/handleError");
const {
  validatePaginationParams,
} = require("../utils/validatePaginationParams");

exports.getAllMeals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { pageNumber, limitNumber } = validatePaginationParams(page, limit);
    const offset = (pageNumber - 1) * limitNumber;

    const { count, rows: meals } = await db.Meal.findAndCountAll({
      limit: limitNumber,
      offset,
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    res.status(200).json({
      status: "success",
      message: "Meals retrieved successfully",
      totalItems: count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      data: meals,
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve meals");
  }
};

// Get a single meal by ID
exports.getMealById = async (req, res) => {
  try {
    const meal = await db.Meal.findByPk(req.params.id, {
      include: [
        {
          model: db.Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    handleResponse(res, "Meal retrieved successfully", meal);
  } catch (error) {
    handleError(res, error, "Failed to retrieve meal");
  }
};

// Create a new meal
exports.createMeal = async (req, res) => {
  try {
    const { category_id, price } = req.body;
    if (!category_id || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMeal = await db.Meal.create({
      category_id,
      price,
    });
    handleResponse(res, "Meal created successfully", newMeal);
  } catch (error) {
    handleError(res, error, "Failed to create meal");
  }
};

// Update an existing meal
exports.updateMeal = async (req, res) => {
  try {
    const { category_id, price } = req.body;
    const meal = await db.Meal.findByPk(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    meal.category_id = category_id || meal.category_id;
    meal.price = price || meal.price;
    const updatedMeal = await meal.save();
    handleResponse(res, "Meal updated successfully", updatedMeal);
  } catch (error) {
    handleError(res, error, "Failed to update meal");
  }
};

// Delete a meal
exports.deleteMeal = async (req, res) => {
  try {
    const meal = await db.Meal.findByPk(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    const deletedMeal = await meal.destroy();
    handleResponse(res, "Meal deleted successfully", deletedMeal);
  } catch (error) {
    handleError(res, error, "Failed to delete meal");
  }
};
