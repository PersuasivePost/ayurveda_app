const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

// handler functions exported so server.js can mount them directly at /auth
async function signupHandler(req, res) {
  try {
    const { name, email, password, accountType } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const userData = { name, email, password: hash };
    if (accountType && (accountType === "free" || accountType === "pro")) {
      userData.accountType = accountType;
    }
    const user = new User(userData);
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET /auth/me - Get current user (requires token)
async function meHandler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}

// POST /auth/refresh - Refresh the JWT token (works even if token is expired)
async function refreshHandler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });
  
  const token = auth.split(" ")[1];
  try {
    // Verify the current token with ignoreExpiration to allow refresh of expired tokens
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
    
    // Generate a new token
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    res.json({ token: newToken });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
}

// GET /auth/profile - Get current user's profile (requires authentication)
router.get("/profile", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password") // Exclude password from response
      .populate("cart.product", "name price image")
      .populate("records")
      .populate("orders");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        accountType: user.accountType,
        doshaBodyType: user.doshaBodyType,
        doshaScores: user.doshaScores,
        quizTakenAt: user.quizTakenAt,
        cart: user.cart,
        records: user.records,
        orders: user.orders,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// PUT /auth/profile - Update user profile (requires authentication)
router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        accountType: user.accountType,
        doshaBodyType: user.doshaBodyType,
        doshaScores: user.doshaScores,
        quizTakenAt: user.quizTakenAt
      }
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// wire handlers to router for /api/auth routes
router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/me", meHandler);
router.post("/refresh", refreshHandler);

// update current user profile (name, phone, address, password)
router.patch("/me", requireAuth, async (req, res) => {
  try {
    const id = req.user.id;
    const { name, phone, address, password } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (address) updates.address = address;
    if (password) updates.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// delete current user account
router.delete("/me", requireAuth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/auth/upgrade - upgrade current user to pro (protected)
router.post("/upgrade", requireAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { accountType: "pro" },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ message: "Upgraded to pro", user: { id: user._id, accountType: user.accountType } });
  } catch (err) {
    console.error("Error upgrading user:", err);
    res.status(500).json({ error: "Failed to upgrade user" });
  }
});

module.exports = { router, signupHandler, loginHandler };
