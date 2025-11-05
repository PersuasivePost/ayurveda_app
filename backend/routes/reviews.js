const express = require("express");
const Product = require("../schema/Product");
const Order = require("../schema/Order");
const User = require("../schema/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// POST /reviews/:productId - Add a review for a product
router.post("/:productId", requireAuth, async (req, res) => {
  try {
    const { rating, title, comment } = req.body;
    const { productId } = req.params;
    const userId = req.user.id;

    // Validate input
    if (!rating || !title || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user has purchased this product (optional but recommended)
    const order = await Order.findOne({
      user: userId,
      "items.product": productId,
    });

    const user = await User.findById(userId);

    // Create review object
    const review = {
      userId,
      userName: user.name || "Anonymous",
      rating: parseInt(rating),
      title,
      comment,
      verified: !!order, // mark as verified if user has purchased
    };

    // Check if user already reviewed this product
    const existingReview = product.reviews.findIndex((r) => r.userId.toString() === userId);
    if (existingReview !== -1) {
      // Update existing review
      product.reviews[existingReview] = review;
    } else {
      // Add new review
      product.reviews.push(review);
    }

    // Recalculate average rating
    if (product.reviews.length > 0) {
      const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.avgRating = parseFloat((sum / product.reviews.length).toFixed(1));
      product.reviewCount = product.reviews.length;
    }

    await product.save();
    res.json({ review, avgRating: product.avgRating, reviewCount: product.reviewCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /reviews/:productId - Get reviews for a product
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit || "5", 10)));

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Sort reviews by most recent
    const sortedReviews = product.reviews.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const total = sortedReviews.length;
    const reviews = sortedReviews.slice((page - 1) * limit, page * limit);

    res.json({
      reviews,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      avgRating: product.avgRating,
      reviewCount: product.reviewCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /reviews/:productId/:reviewId - Delete a review
router.delete("/:productId/:reviewId", requireAuth, async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviewIndex = product.reviews.findIndex((r) => r._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if user is the review author or admin
    if (product.reviews[reviewIndex].userId.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    product.reviews.splice(reviewIndex, 1);

    // Recalculate average rating
    if (product.reviews.length > 0) {
      const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.avgRating = parseFloat((sum / product.reviews.length).toFixed(1));
      product.reviewCount = product.reviews.length;
    } else {
      product.avgRating = 0;
      product.reviewCount = 0;
    }

    await product.save();
    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
