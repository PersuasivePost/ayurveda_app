const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor"], default: "doctor" },
    speciality: { type: String },
    clinicAddress: { type: String },
  // image URL (Backblaze or local path)
  image: { type: String },
    fee: { type: Number, default: 0 },
    uniqueId: { type: String, unique: true },
    availability: [
      // simple availability entries e.g. { day: 'Mon', from: '10:00', to: '14:00' }
      { day: String, from: String, to: String },
    ],
    // log of patients treated (lightweight)
    patientLogs: [
      {
        patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        notes: String,
        date: Date,
        feeCharged: Number,
      },
    ],
    phone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
