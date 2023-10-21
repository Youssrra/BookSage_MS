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

// Find reviews by userId
router.get("/reviews/user/:userId", reviewController.getReviewsByUserId);

// Find reviews by bookId
router.get("/reviews/book/:bookId", reviewController.getReviewsByBookId);

module.exports = router;