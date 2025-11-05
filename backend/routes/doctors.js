const express = require("express");
const bcrypt = require("bcrypt");
const Doctor = require("../schema/Doctor");
const User = require("../schema/User");
const Appointment = require("../schema/Appointment");
const { requireAuth } = require("../middleware/auth");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { uploadBuffer } = require("../config/backblaze");

const jwt = require("jsonwebtoken");
const router = express.Router();
// parse JSON bodies for this router even if client omits Content-Type header
router.use(express.json({ type: "*/*" }));

// local uploads directory (shared with server/admin)
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const safe = Date.now() + "-" + file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    cb(null, safe);
  },
});
const upload = multer({ storage });

// create a doctor account (minimal). Frontend can call this to add doctors.
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      clinicAddress,
      fee,
      uniqueId,
      phone,
    } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });
    const existing = await Doctor.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });
    const hash = await bcrypt.hash(password, 10);
    // if uniqueId not provided, generate a short random uniqueId
    const genId = () => Math.random().toString(36).slice(2, 9);
    const finalUniqueId = uniqueId || genId();

    const d = new Doctor({
      name,
      email,
      password: hash,
      speciality,
      clinicAddress,
      fee,
      uniqueId: finalUniqueId,
      phone,
    });
    await d.save();
    res.json({ doctor: { id: d._id, name: d.name, email: d.email } });
  } catch (err) {
    console.error(err);
    // handle duplicate key errors (e.g., uniqueId or email)
    if (err && err.code === 11000) {
      const dupField = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${dupField} already exists` });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// doctor login to receive JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });
    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ message: "Invalid credentials" });
    const match = await bcrypt.compare(password, doctor.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: doctor._id, email: doctor.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token,
      doctor: { id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get statistics for home page
router.get("/stats/homepage", async (req, res) => {
  try {
    // Count total doctors
    const totalDoctors = await Doctor.countDocuments();
    
    // Count unique patients (users who have appointments)
    const appointments = await Appointment.distinct("patient");
    const totalPatients = appointments.length;
    
    // Calculate average rating (if you have ratings in Doctor schema)
    // For now, we'll use a placeholder or calculate from reviews
    const doctors = await Doctor.find().select("rating");
    let averageRating = 4.9; // default
    if (doctors.length > 0) {
      const doctorsWithRating = doctors.filter(d => d.rating && d.rating > 0);
      if (doctorsWithRating.length > 0) {
        const totalRating = doctorsWithRating.reduce((sum, d) => sum + (d.rating || 0), 0);
        averageRating = (totalRating / doctorsWithRating.length).toFixed(1);
      }
    }
    
    res.json({
      totalDoctors,
      totalPatients,
      averageRating: parseFloat(averageRating),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// search doctors by name, speciality or clinic address
router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    const filter = {};
    if (q) {
      const re = new RegExp(q, "i");
      filter.$or = [{ name: re }, { speciality: re }, { clinicAddress: re }];
    }
    const docs = await Doctor.find(filter).select("-password");
    res.json({ doctors: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// get doctor by id
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const d = await Doctor.findById(req.params.id).select("-password");
    if (!d) return res.status(404).json({ message: "Doctor not found" });
    res.json({ doctor: d });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// update doctor profile (self)
router.patch("/me", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const id = req.user.id;
    const { name, speciality, clinicAddress, fee, phone, password } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (speciality) updates.speciality = speciality;
    if (clinicAddress) updates.clinicAddress = clinicAddress;
    if (fee !== undefined) updates.fee = fee;
    if (phone) updates.phone = phone;
    if (password) updates.password = await bcrypt.hash(password, 10);

    // handle image upload if provided
    if (req.file) {
      try {
        console.log(`[DOCTORS] Processing doctor image upload: ${req.file.path}`);
        const buffer = fs.readFileSync(req.file.path);
        console.log(`[DOCTORS] Read file buffer: ${buffer.length} bytes from ${req.file.path}`);
        const key = `doctors/${Date.now()}-${req.file.filename}`;
        console.log(`[DOCTORS] Calling uploadBuffer with key: ${key}`);
        updates.image = await uploadBuffer(buffer, key, req.file.mimetype);
        console.log(`[DOCTORS] uploadBuffer returned URL: ${updates.image}`);
      } catch (e) {
        console.error("[DOCTORS] Backblaze upload failed:", e.message);
        console.error("[DOCTORS] Full error:", e);
        // fallback to local path
        updates.image = "/uploads/" + req.file.filename;
      } finally {
        try {
          if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            console.log(`[DOCTORS] Deleting temporary file: ${req.file.path}`);
            fs.unlinkSync(req.file.path);
          }
        } catch (e) {
          console.warn("[DOCTORS] Could not remove temporary upload file", e.message);
        }
      }
    }

    const doc = await Doctor.findByIdAndUpdate(id, updates, {
      new: true,
    }).select("-password");
    if (!doc) return res.status(404).json({ message: "Doctor not found" });
    res.json({ doctor: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// delete doctor account (self)
router.delete("/me", requireAuth, async (req, res) => {
  try {
    const id = req.user.id;
    const doc = await Doctor.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
