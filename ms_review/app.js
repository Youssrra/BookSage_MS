const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const path = require("path");
const indexRouter = require("./routes/index");
const reviewRoutes = require("./routes/reviewRoutes");
const eurekaHelper = require('./eureka-config');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

const app = express();
mongoose.set("strictQuery", true);

app.set("views", path.join(__dirname, "views")); // set the views directory
app.set("view engine", "twig"); // set the view engine
app.use(express.json());

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with the URL of your frontend application
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization', // Include Authorization header
};

app.use(cors(corsOptions));

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
mongoose.connect('mongodb+srv://yousra:yousra@cluster0.nxwu1do.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
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
