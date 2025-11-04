const mongoose = require("mongoose");

const doshaQuizSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionId: { type: Number, required: true },
        answer: { type: String, required: true },
      },
    ],
    scores: {
      vata: { type: Number, required: true },
      pitta: { type: Number, required: true },
      kapha: { type: Number, required: true },
    },
    result: {
      type: String,
      enum: ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha", "Tridoshic"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DoshaQuiz", doshaQuizSchema);