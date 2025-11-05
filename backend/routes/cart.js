const express = require("express");
const User = require("../schema/User");
const Product = require("../schema/Product");
const Order = require("../schema/Order");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// add/update item in cart
router.post("/add", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: "productId required" });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart || [];
    const existing = user.cart.find((c) => String(c.product) === String(productId));

    // Normalize quantity to a number when provided
    const qty = typeof quantity === 'number' ? quantity : (quantity ? Number(quantity) : undefined);

    // If quantity is explicitly 0, remove the item
    if (qty === 0) {
      user.cart = user.cart.filter((c) => String(c.product) !== String(productId));
    } else if (existing) {
      // When an existing item is present, treat the provided quantity as a delta to add/remove
      // (positive to increase, negative to decrease). If qty is undefined, default to +1.
      const delta = (typeof qty === 'number') ? qty : 1;
      existing.quantity = (existing.quantity || 0) + delta;
      // remove if quantity drops to 0 or less
      if (existing.quantity <= 0) {
        user.cart = user.cart.filter((c) => String(c.product) !== String(productId));
      }
    } else {
      // Add new item - only add if qty is positive, default to 1
      const initial = (typeof qty === 'number' && qty > 0) ? qty : 1;
      user.cart.push({ product: productId, quantity: initial });
    }
    
    await user.save();
    const populated = await User.findById(userId).populate("cart.product");
    
    // Generate presigned URLs for Backblaze images
    const { getPresignedUrl } = require('../config/backblaze');
    const bucket = process.env.B2_BUCKET;
    
    const cart = populated.cart || [];
    const cartOut = [];
    
    for (const item of cart) {
      const cartItem = { ...item.toObject ? item.toObject() : item };
      const prod = cartItem.product;
      
      if (prod) {
        const prodObj = prod.toObject ? prod.toObject() : prod;
        
        // Process main image
        if (prodObj.image && /^https?:\/\//i.test(prodObj.image) && bucket && prodObj.image.includes(bucket)) {
          try {
            const parsed = new URL(prodObj.image);
            const key = parsed.pathname.replace(/^\//, '');
            const presigned = await getPresignedUrl(key, 300);
            prodObj.image = presigned;
          } catch (e) {
            console.warn('Could not create presigned url for main image', prodObj.image, e && e.message ? e.message : e);
          }
        }
        
        // Process images array
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
                console.warn('Could not create presigned url for image', img, e && e.message ? e.message : e);
                presignedImages.push(img);
              }
            } else {
              presignedImages.push(img);
            }
          }
          prodObj.images = presignedImages;
        }
        
        cartItem.product = prodObj;
      }
      
      cartOut.push(cartItem);
    }
    
    res.json({ cart: cartOut });
  } catch (err) {
    console.error("Cart add error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// get current cart
router.get("/", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Generate presigned URLs for Backblaze images
    const { getPresignedUrl } = require('../config/backblaze');
    const bucket = process.env.B2_BUCKET;
    
    const cart = user.cart || [];
    const cartOut = [];
    
    for (const item of cart) {
      const cartItem = { ...item.toObject ? item.toObject() : item };
      const product = cartItem.product;
      
      if (product) {
        const prodObj = product.toObject ? product.toObject() : product;
        
        // Process main image
        if (prodObj.image && /^https?:\/\//i.test(prodObj.image) && bucket && prodObj.image.includes(bucket)) {
          try {
            const parsed = new URL(prodObj.image);
            const key = parsed.pathname.replace(/^\//, '');
            const presigned = await getPresignedUrl(key, 300);
            prodObj.image = presigned;
          } catch (e) {
            console.warn('Could not create presigned url for main image', prodObj.image, e && e.message ? e.message : e);
          }
        }
        
        // Process images array
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
                console.warn('Could not create presigned url for image', img, e && e.message ? e.message : e);
                presignedImages.push(img);
              }
            } else {
              presignedImages.push(img);
            }
          }
          prodObj.images = presignedImages;
        }
        
        cartItem.product = prodObj;
      }
      
      cartOut.push(cartItem);
    }
    
    res.json({ cart: cartOut });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// checkout - requires address and phone; creates order with pending payment
router.post("/checkout", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    if (!user) return res.status(404).json({ message: "User not found" });

    const address = req.body.address || user.address;
    const phone = req.body.phone || user.phone;
    if (!address || !phone)
      return res.status(400).json({ message: "Address and phone are required to place an order" });

    const cart = user.cart || [];
    if (!cart.length) return res.status(400).json({ message: "Cart is empty" });

    // build items and compute total
    let total = 0;
    const items = cart
      .filter((c) => c.product) // Filter out null/deleted products
      .map((c) => {
        const p = c.product;
        const qty = c.quantity || 1;
        const price = p.price || 0;
        total += price * qty;
        return { product: p._id, name: p.name, price, quantity: qty };
      });

    // Check if any valid items remain after filtering
    if (!items.length) {
      return res.status(400).json({ message: "Cart has no valid items" });
    }

    const order = new Order({ 
      user: user._id, 
      items, 
      address, 
      phone, 
      total,
      payment_status: "pending", // Payment is pending initially
    });
    await order.save();

    // attach order to user's history so it appears on their profile
    user.orders = user.orders || [];
    user.orders.push(order._id);

    // DON'T clear cart yet - wait for successful payment
    // Cart will be cleared after payment verification succeeds
    
    // optionally update user's stored address/phone if provided in body
    if (req.body.address) user.address = req.body.address;
    if (req.body.phone) user.phone = req.body.phone;
    await user.save();

    // Return the order - frontend will initiate payment using the orderId
    res.json({ 
      order,
      message: "Order created. Please complete payment to confirm.",
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ 
      message: "Server error during checkout", 
      error: err.message 
    });
  }
});

module.exports = router;
