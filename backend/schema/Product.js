const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    // image stored as URL or path; file upload can be added later
    image: { type: String },
    metadata: { type: Object },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
