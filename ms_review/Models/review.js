const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Long, Int32 } = require("mongodb");

const reviewSchema = new mongoose.Schema({
	userId: {
    type: Number,
	required: true,
  },
  bookId : {
    type: String,
    required: true,
  },
  comment : {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
});


const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
