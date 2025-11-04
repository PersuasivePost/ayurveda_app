const mongoose = require("mongoose");

// Patient (user) schema - kept intentionally minimal. New doctor users are
// stored in a separate `Doctor` model.
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["patient"], default: "patient" },
    accountType: { type: String, enum: ["free", "pro"], default: "free" }, //pro users may have extra features later
    phone: { type: String },
    address: { type: String },
     // for pro subscription management
     proExpiresAt: { type: Date },
     proPaidAt: { type: Date },
    // Dosha body type result
    doshaBodyType: {
      type: String,
      enum: ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha", "Tridoshic"],
      default: undefined  // Changed from null to undefined
    },
    doshaScores: {
      vata: { type: Number, default: 0 },
      pitta: { type: Number, default: 0 },
      kapha: { type: Number, default: 0 }
    },
    quizTakenAt: { type: Date },
    // cart stores product references and quantities for quick cart operations
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    // lightweight history reference - not strictly required but convenient
    // for later queries. We'll store appointment references here when created.
    records: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }],
    // orders placed by the user
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);