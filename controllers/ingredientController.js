const db = require("../models");
const { handleResponse } = require("../utils/handleResponse");
const { handleError } = require("../utils/handleError");
const {
  validatePaginationParams,
} = require("../utils/validatePaginationParams");

exports.getAllIngredients = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const { pageNumber, limitNumber } = validatePaginationParams(page, limit);
    const offset = (pageNumber - 1) * limitNumber;

    const { count, rows: ingredients } = await db.Ingredient.findAndCountAll({
      limit: limitNumber,
      offset,
    });

    res.status(200).json({
      status: "success",
      message: "Ingredients retrieved successfully",
      totalItems: count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      data: ingredients,
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve ingredients");
  }
};

// Get a single ingredient by ID
exports.getIngredientById = async (req, res) => {
  try {
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    handleResponse(res, "Ingredient retrieved successfully", ingredient);
  } catch (error) {
    handleError(res, error, "Failed to retrieve ingredient");
  }
};

// Create a new ingredient
exports.createIngredient = async (req, res) => {
  try {
    const { meal_id, name, taste } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const newIngredient = await db.Ingredient.create({
      meal_id,
      name,
      taste,
    });
    handleResponse(res, "Ingredient created successfully", newIngredient);
  } catch (error) {
    handleError(res, error, "Failed to create ingredient");
  }
};

// Update an ingredient by ID
exports.updateIngredient = async (req, res) => {
  try {
    const { name, taste } = req.body;
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    ingredient.name = name || ingredient.name;
    ingredient.taste = taste || ingredient.taste;
    const updatedIngredients = await ingredient.save();
    handleResponse(res, "Ingredient updated successfully", updatedIngredients);
  } catch (error) {
    handleError(res, error, "Failed to update ingredient");
  }
};

// Delete an ingredient by ID
exports.deleteIngredient = async (req, res) => {
  try {
    const ingredient = await db.Ingredient.findByPk(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    const deletedIngredients = await ingredient.destroy();
    handleResponse(res, "Ingredient deleted successfully", deletedIngredients);
  } catch (error) {
    handleError(res, error, "Failed to delete ingredient");
  }
};
