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

    // Post-process product images to provide presigned URLs (if stored on Backblaze)
    try {
      const { getPresignedUrl } = require('../config/backblaze');
      const bucket = process.env.B2_BUCKET;

      for (const order of orders) {
        if (!order.items) continue;
        for (const item of order.items) {
          const prod = item.product;
          if (!prod) continue;
          const prodObj = prod.toObject ? prod.toObject() : prod;

          if (prodObj.image && /^https?:\/\//i.test(prodObj.image) && bucket && prodObj.image.includes(bucket)) {
            try {
              const parsed = new URL(prodObj.image);
              const key = parsed.pathname.replace(/^\//, '');
              const presigned = await getPresignedUrl(key, 300);
              prodObj.image = presigned;
            } catch (e) {
              console.warn('Could not create presigned url for order item image', prodObj.image, e && e.message ? e.message : e);
            }
          }

          if (prodObj.images && Array.isArray(prodObj.images)) {
            const presignedImages = [];
            for (const img of prodObj.images) {
              if (img && /^https?:\/\//i.test(img) && bucket && img.includes(bucket)) {
                try {
                  const parsed = new URL(img);
                  const key = parsed.pathname.replace(/^\//, '');
                  const presigned = await getPresignedUrl(key, 300);
                  presignedImages.push(presigned);
                } catch (e) {
                  console.warn('Could not create presigned url for order item image', img, e && e.message ? e.message : e);
                  presignedImages.push(img);
                }
              } else {
                presignedImages.push(img);
              }
            }
            prodObj.images = presignedImages;
          }

          item.product = prodObj;
        }
      }
    } catch (e) {
      console.warn('Presigned image processing for orders failed:', e && e.message ? e.message : e);
    }

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

    // Post-process images similarly to the list endpoint
    try {
      const { getPresignedUrl } = require('../config/backblaze');
      const bucket = process.env.B2_BUCKET;

      if (order.items && Array.isArray(order.items)) {
        for (const item of order.items) {
          const prod = item.product;
          if (!prod) continue;
          const prodObj = prod.toObject ? prod.toObject() : prod;

          if (prodObj.image && /^https?:\/\//i.test(prodObj.image) && bucket && prodObj.image.includes(bucket)) {
            try {
              const parsed = new URL(prodObj.image);
              const key = parsed.pathname.replace(/^\//, '');
              const presigned = await getPresignedUrl(key, 300);
              prodObj.image = presigned;
            } catch (e) {
              console.warn('Could not create presigned url for order item image', prodObj.image, e && e.message ? e.message : e);
            }
          }

          if (prodObj.images && Array.isArray(prodObj.images)) {
            const presignedImages = [];
            for (const img of prodObj.images) {
              if (img && /^https?:\/\//i.test(img) && bucket && img.includes(bucket)) {
                try {
                  const parsed = new URL(img);
                  const key = parsed.pathname.replace(/^\//, '');
                  const presigned = await getPresignedUrl(key, 300);
                  presignedImages.push(presigned);
                } catch (e) {
                  console.warn('Could not create presigned url for order item image', img, e && e.message ? e.message : e);
                  presignedImages.push(img);
                }
              } else {
                presignedImages.push(img);
              }
            }
            prodObj.images = presignedImages;
          }

          item.product = prodObj;
        }
      }
    } catch (e) {
      console.warn('Presigned image processing for order detail failed:', e && e.message ? e.message : e);
    }

    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
