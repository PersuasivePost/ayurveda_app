const jwt = require("jsonwebtoken");

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "No token" });
  const token = auth.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.admin)
      return res.status(403).json({ message: "Admin access required" });
    req.admin = { email: decoded.email };
    next();
  } catch (err) {
    console.error("Admin auth error", err);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { requireAdmin };
