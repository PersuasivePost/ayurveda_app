const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: false }, // purchased customer
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    // image stored as URL or path; can be single or multiple
    image: { type: String },
    // array of additional images for gallery
    images: [{ type: String }],
    // stock management
    stock: { type: Number, default: 100 },
    // category or tags
    category: { type: String },
    tags: [{ type: String }],
    // detailed description
    longDescription: { type: String },
    // benefits and uses
    benefits: [{ type: String }],
    // usage instructions
    usage: { type: String },
    // ingredients
    ingredients: [{ type: String }],
    // reviews and ratings
    reviews: [reviewSchema],
    // avg rating calculated from reviews
    avgRating: { type: Number, default: 0, min: 0, max: 5 },
    // total reviews count
    reviewCount: { type: Number, default: 0 },
    // metadata for any additional info
    metadata: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
