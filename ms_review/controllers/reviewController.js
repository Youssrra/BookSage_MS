const Review = require("../Models/review");


// Create a new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find reviews by userid
exports.getReviewsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const reviews = await Review.find({ userId: userId });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "Reviews not found for this userId" });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Find reviews by bookId
exports.getReviewsByBookId = async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const reviews = await Review.find({ bookId: bookId });
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "Reviews not found for this bookId" });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



