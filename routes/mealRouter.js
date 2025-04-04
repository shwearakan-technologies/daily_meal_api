const mealRouter = require("express").Router();
const mealController = require("../controllers/mealController");

mealRouter
  .route("/")
  .get(mealController.getAllMeals)
  .post(mealController.createMeal);

mealRouter
  .route("/:id")
  .get(mealController.getMealById)
  .put(mealController.updateMeal)
  .delete(mealController.deleteMeal);

module.exports = mealRouter;
