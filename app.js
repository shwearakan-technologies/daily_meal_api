const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const categoryRouter = require("./routes/categoryRouter");
const mealRouter = require("./routes/mealRouter");
const ingredientRouter = require("./routes/ingredientRouter");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
express.static(path.join(__dirname, "public/uploads"));

// Routes
app.get("/", async (req, res) => {
  res.send("Welcome to the home page!");
});

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/meals", mealRouter);
app.use("/api/v1/ingredients", ingredientRouter);

module.exports = app;
