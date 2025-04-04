const db = require("../models");
const { Op } = db.Sequelize;
const {
  validatePaginationParams,
} = require("../utils/validatePaginationParams");
const { handleError } = require("../utils/handleError");
const { handleResponse } = require("../utils/handleResponse");

// Get all categories with pagination and search/filter
exports.getAllCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const { pageNumber, limitNumber } = validatePaginationParams(page, limit);
    const offset = (pageNumber - 1) * limitNumber;

    const whereConditions = search
      ? { name: { [Op.like]: `%${search}%` } }
      : {};

    const { count, rows: categories } = await db.Category.findAndCountAll({
      where: whereConditions,
      limit: limitNumber,
      offset,
      order: [["name", "ASC"]],
    });

    res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      totalItems: count,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      data: categories,
    });
  } catch (error) {
    handleError(res, error, "Failed to retrieve categories");
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await db.Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    handleResponse(res, "Category retrieved successfully", category);
  } catch (error) {
    handleError(res, error, "Failed to retrieve category");
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const newCategory = await db.Category.create({
      name,
      description,
    });
    handleResponse(res, "Category created successfully", newCategory);
  } catch (error) {
    handleError(res, error, "Failed to create category");
  }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await db.Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    const updatedCategory = await category.save();
    handleResponse(res, "Category updated successfully", updatedCategory);
  } catch (error) {
    handleError(res, error, "Failed to update category");
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await db.Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const deletedCategory = await category.destroy();
    handleResponse(res, "Category deleted successfully", deletedCategory);
  } catch (error) {
    handleError(res, error, "Failed to delete category");
  }
};
