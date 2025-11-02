require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
  router: authRouter,
  signupHandler,
  loginHandler,
} = require("./routes/auth");
const doctorsRouter = require("./routes/doctors");
const appointmentsRouter = require("./routes/appointments");

const app = express();
app.use(express.json());

// check required env vars early
const missing = [];
if (!process.env.MONGO_URI) missing.push("MONGO_URI");
if (!process.env.JWT_SECRET) missing.push("JWT_SECRET");

if (missing.length) {
  console.error(
    "ERROR: Missing required environment variable(s):",
    missing.join(", ")
  );
  console.error(
    "Create backend/.env with at least:\nMONGO_URI=...\nJWT_SECRET=...\nPORT=5000"
  );
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("API running"));

// Configure CORS to allow deployed frontends. Read allowed origins from
// the environment variable ALLOWED_ORIGINS (comma-separated). This keeps
// deployed URLs out of source code and lets you configure them in Render/Vercel.
const rawAllowed = process.env.ALLOWED_ORIGINS || "http://localhost:3000";
const allowedOrigins = rawAllowed
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .map((origin) => origin.replace(/\/+$/, ""));

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    const normalized = origin.replace(/\/+$/, "");
    if (allowedOrigins.indexOf(normalized) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// mount auth routes at /auth
app.use("/auth", authRouter);

// also expose root-level login/signup for convenience
app.post("/signup", signupHandler);
app.post("/login", loginHandler);

// connect and start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // mount application routes after DB connect
    // mount doctors routes at both /doctors and /doctor (accept singular from some clients)
    app.use("/doctors", doctorsRouter);
    app.use("/doctor", doctorsRouter);
    app.use("/appointments", appointmentsRouter);

    // simple admin login using env-stored credentials. Expect ADMIN_CREDENTIALS
    // to be a JSON string like: [{"email":"a@x","password":"p"},...]
    // exposed at /admin/login
    app.post("/admin/login", (req, res) => {
      const adminsRaw = process.env.ADMIN_CREDENTIALS || "[]";
      let admins = [];
      try {
        admins = JSON.parse(adminsRaw);
      } catch (e) {
        admins = [];
      }
      const { email, password } = req.body;
      const found = admins.find(
        (a) => a.email === email && a.password === password
      );
      if (!found)
        return res.status(401).json({ message: "Invalid admin credentials" });
      // return a tiny token-like payload (not JWT) to indicate success
      res.json({ admin: { email: found.email } });
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
