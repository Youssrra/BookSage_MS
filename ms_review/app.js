const createError = require("http-errors");
const express = require("express");
const path = require("path");

const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const reviewRoutes = require("./routes/reviewRoutes");

require("dotenv").config();
require("./Models/review");	
require('./eureka-config');
const eurekaHelper = require('./eureka-config');

const app = express();
mongoose.set("strictQuery", true);

app.set("views", "views"); // set the views directory
app.set("view engine", "twig"); // set the view engine
app.use(express.json());
app.use(reviewRoutes);
app.use("/", indexRouter);


app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json(err.message);
});

// Database connection
mongoose.connect('mongodb://127.0.0.1:27017/reviewDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const port = process.env.PORT || 5000; // Use the PORT environment variable if available, or default to 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

eurekaHelper.registerWithEureka('ms_review_nodejs', port);

module.exports = app;