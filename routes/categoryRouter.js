const categoryRouter = require("express").Router();
const categoryController = require("../controllers/categoryController");

categoryRouter
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

categoryRouter
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = categoryRouter;
