const express = require("express");
const Order = require("../schema/Order");
const User = require("../schema/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// GET /orders - list orders for current user
router.get("/", requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("items.product", "name price image");
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /orders/:id - get a single order (only owner can view)
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.product",
      "name price image"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (String(order.user) !== String(req.user.id))
      return res.status(403).json({ message: "Not allowed" });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
