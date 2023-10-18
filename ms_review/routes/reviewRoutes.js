const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");


router.post("/reviews", reviewController.createReview);

// Get all reviews
router.get("/reviews", reviewController.getReviews);

// Update a review by ID
router.put("/reviews/:id", reviewController.updateReview);

// Delete a review by ID
router.delete("/reviews/:id", reviewController.deleteReview);

module.exports = router;