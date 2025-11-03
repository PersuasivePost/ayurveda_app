const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    address: { type: String, required: true },
    phone: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, enum: ["placed", "shipped", "delivered", "cancelled"], default: "placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
