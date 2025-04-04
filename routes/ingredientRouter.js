const ingredientRouter = require("express").Router();
const ingredientController = require("../controllers/ingredientController");

ingredientRouter
  .route("/")
  .get(ingredientController.getAllIngredients)
  .post(ingredientController.createIngredient);

ingredientRouter
  .route("/:id")
  .get(ingredientController.getIngredientById)
  .put(ingredientController.updateIngredient)
  .delete(ingredientController.deleteIngredient);

module.exports = ingredientRouter;
