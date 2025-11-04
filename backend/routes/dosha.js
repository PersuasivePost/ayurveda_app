const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const DoshaQuiz = require("../schema/DoshaQuiz");
const User = require("../schema/User");

// Quiz questions - 18 selected questions from your list
const quizQuestions = [
  {
    id: 1,
    question: "Which of these best describes your physical frame?",
    options: [
      { text: "Small", dosha: "vata" },
      { text: "Medium", dosha: "pitta" },
      { text: "Large", dosha: "kapha" }
    ]
  },
  {
    id: 2,
    question: "Which best describes your skin?",
    options: [
      { text: "Dry", dosha: "vata" },
      { text: "Oily and soft with freckles or pimples", dosha: "pitta" },
      { text: "Thick, oily, cool skin", dosha: "kapha" }
    ]
  },
  {
    id: 3,
    question: "Which best describes your hair?",
    options: [
      { text: "Dry and curly", dosha: "vata" },
      { text: "Straight and fine", dosha: "pitta" },
      { text: "Thick and lustrous", dosha: "kapha" }
    ]
  },
  {
    id: 4,
    question: "Which best describes your eyes?",
    options: [
      { text: "Small and dry", dosha: "vata" },
      { text: "Medium-sized; intense gaze", dosha: "pitta" },
      { text: "Large, pretty", dosha: "kapha" }
    ]
  },
  {
    id: 5,
    question: "Which best describes how you talk?",
    options: [
      { text: "Fast and/or a lot!", dosha: "vata" },
      { text: "My words are sharp and concise.", dosha: "pitta" },
      { text: "My speech is slow and calm.", dosha: "kapha" }
    ]
  },
  {
    id: 6,
    question: "What type of weather is your favorite?",
    options: [
      { text: "Warm", dosha: "vata" },
      { text: "Cool", dosha: "pitta" },
      { text: "Cool and dry", dosha: "kapha" }
    ]
  },
  {
    id: 7,
    question: "How is your memory?",
    options: [
      { text: "I learn quickly, but I also forget quickly.", dosha: "vata" },
      { text: "I have a great memory!", dosha: "pitta" },
      { text: "It takes me a while to commit something to memory, but once I do I don't forget it.", dosha: "kapha" }
    ]
  },
  {
    id: 8,
    question: "Which best describes your personality?",
    options: [
      { text: "Creative, joyful, and introspective", dosha: "vata" },
      { text: "Competitive, perceptive, and efficient", dosha: "pitta" },
      { text: "Responsible, nurturing, and sensitive", dosha: "kapha" }
    ]
  },
  {
    id: 9,
    question: "Which of these traits do you most identify with?",
    options: [
      { text: "I'm often indecisive.", dosha: "vata" },
      { text: "I get jealous easily.", dosha: "pitta" },
      { text: "I can be pretty stubborn.", dosha: "kapha" }
    ]
  },
  {
    id: 10,
    question: "How about these traits? Which sounds the most like you?",
    options: [
      { text: "I'm very intuitive.", dosha: "vata" },
      { text: "I'm quite brave.", dosha: "pitta" },
      { text: "I'm a loyal, faithful friend.", dosha: "kapha" }
    ]
  },
  {
    id: 11,
    question: "And these? Which sounds the most like you?",
    options: [
      { text: "I'm often restless.", dosha: "vata" },
      { text: "I can be irritable and impatient.", dosha: "pitta" },
      { text: "I'm a loyal, faithful friend.", dosha: "kapha" }
    ]
  },
  {
    id: 12,
    question: "When you're under stress, do you experience insomnia?",
    options: [
      { text: "Yes", dosha: "vata" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 13,
    question: "When you're under stress, do you lose weight?",
    options: [
      { text: "Yes", dosha: "vata" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 14,
    question: "When you're under stress, do you experience constipation or excess gas?",
    options: [
      { text: "Yes", dosha: "vata" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 15,
    question: "When you're under stress, do you easily lose your temper?",
    options: [
      { text: "Yes", dosha: "pitta" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 16,
    question: "When you're under stress, do you sweat a lot or have excess body odor?",
    options: [
      { text: "Yes", dosha: "pitta" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 17,
    question: "When you're under stress, do you retain water?",
    options: [
      { text: "Yes", dosha: "kapha" },
      { text: "No", dosha: null }
    ]
  },
  {
    id: 18,
    question: "When you're under stress, do you sleep a lot or put on weight?",
    options: [
      { text: "Yes", dosha: "kapha" },
      { text: "No", dosha: null }
    ]
  }
];

// GET /api/dosha/questions - Get quiz questions (requires authentication)
router.get("/questions", requireAuth, (req, res) => {
  res.json({ questions: quizQuestions });
});

// POST /api/dosha/submit - Submit quiz answers (requires authentication)
router.post("/submit", requireAuth, async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ error: "Answers are required" });
    }

    // Calculate scores
    const scores = { vata: 0, pitta: 0, kapha: 0 };

    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (question) {
        const selectedOption = question.options.find(opt => opt.text === answer.answer);
        if (selectedOption && selectedOption.dosha) {
          scores[selectedOption.dosha]++;
        }
      }
    });

    // Determine dosha result
    let result;
    const maxScore = Math.max(scores.vata, scores.pitta, scores.kapha);
    const dominantDoshas = [];

    if (scores.vata === maxScore) dominantDoshas.push("Vata");
    if (scores.pitta === maxScore) dominantDoshas.push("Pitta");
    if (scores.kapha === maxScore) dominantDoshas.push("Kapha");

    if (dominantDoshas.length === 3) {
      result = "Tridoshic";
    } else if (dominantDoshas.length === 2) {
      result = dominantDoshas.join("-");
    } else {
      result = dominantDoshas[0];
    }

    // Save quiz result
    const doshaQuiz = new DoshaQuiz({
      user: req.user.id,
      answers,
      scores,
      result
    });

    await doshaQuiz.save();

    // Update user's dosha body type
    await User.findByIdAndUpdate(req.user.id, {
      doshaBodyType: result,
      doshaScores: scores,
      quizTakenAt: new Date()
    });

    res.json({
      message: "Quiz submitted successfully",
      result,
      scores,
      recommendations: getDoshaRecommendations(result)
    });

  } catch (error) {
    console.error("Error submitting quiz:", error);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

// GET /api/dosha/result - Get user's dosha result (requires authentication)
router.get("/result", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("doshaBodyType doshaScores quizTakenAt");

    if (!user || !user.doshaBodyType) {
      return res.status(404).json({ error: "Quiz not taken yet" });
    }

    res.json({
      doshaBodyType: user.doshaBodyType,
      scores: user.doshaScores,
      quizTakenAt: user.quizTakenAt,
      recommendations: getDoshaRecommendations(user.doshaBodyType)
    });

  } catch (error) {
    console.error("Error fetching dosha result:", error);
    res.status(500).json({ error: "Failed to fetch dosha result" });
  }
});

// GET /api/dosha/history - Get user's quiz history (requires authentication)
router.get("/history", requireAuth, async (req, res) => {
  try {
    const history = await DoshaQuiz.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("result scores createdAt");

    res.json({ history });

  } catch (error) {
    console.error("Error fetching quiz history:", error);
    res.status(500).json({ error: "Failed to fetch quiz history" });
  }
});

// add diet plans (only returned to pro users)
const dietPlans = {
  Vata: {
    title: "VATA DOSHA DIET PLAN",
    summary: "For people with air + space dominance — need grounding, warm, and moist foods",
    morning: {
      time: "6:30 AM – 8:00 AM",
      uponWaking: "Warm water with a few drops of lemon and honey",
      breakfast: ["Warm oatmeal or porridge with ghee, almonds, raisins, and cinnamon", "Herbal tea (ginger or cinnamon-based)"]
    },
    lunch: {
      time: "12:00 PM – 1:30 PM",
      items: ["Steamed rice or khichdi (rice + mung dal + ghee)", "Cooked vegetables like carrots, beets, and sweet potatoes", "A small bowl of lentil soup (dal)", "Herbal drink: Cumin–Coriander–Fennel tea"]
    },
    eveningSnack: {
      time: "5:00 PM – 6:00 PM",
      items: ["Roasted nuts (almonds, cashews)", "Herbal tea (ashwagandha or licorice root)"]
    },
    dinner: {
      time: "7:30 PM – 8:30 PM",
      items: ["Light soup with lentils and soft-cooked veggies", "Steamed rice or lightly buttered chapati", "Warm milk with nutmeg before bed"]
    },
    avoid: ["Cold foods", "Raw salads", "Carbonated drinks", "Dry snacks"],
    favors: ["Warm, oily, nourishing meals"]
  },

  Pitta: {
    title: "PITTA DOSHA DIET PLAN",
    summary: "For people with fire + water dominance — need cooling, light, and hydrating foods",
    morning: {
      time: "6:30 AM – 8:00 AM",
      uponWaking: "Room-temperature coconut water or aloe vera juice",
      breakfast: ["Fresh fruits (melons, apples, pears)", "Coconut milk smoothie with soaked chia seeds", "Mint or rose petal tea"]
    },
    lunch: {
      time: "12:00 PM – 1:30 PM",
      items: ["Steamed rice or quinoa with mung dal (light and cooling)", "Cooked vegetables: zucchini, beans, broccoli, and cucumber raita", "Coconut chutney or mint coriander chutney"]
    },
    eveningSnack: {
      time: "5:00 PM – 6:00 PM",
      items: ["Fruit salad with pomegranate and melon", "Cooling drink: Buttermilk with cumin and coriander powder"]
    },
    dinner: {
      time: "7:30 PM – 8:30 PM",
      items: ["Vegetable soup with rice noodles or moong dal soup", "Boiled vegetables with a drizzle of ghee", "Warm almond milk with cardamom"]
    },
    avoid: ["Spicy, fried, or fermented foods", "Coffee", "Alcohol"],
    favors: ["Cooling, sweet, bitter, and astringent foods"]
  },

  Kapha: {
    title: "KAPHA DOSHA DIET PLAN",
    summary: "For people with earth + water dominance — need light, warm, and stimulating foods",
    morning: {
      time: "6:00 AM – 8:00 AM",
      uponWaking: "Warm water with lemon and a pinch of turmeric",
      breakfast: ["Steamed vegetables or upma with spices (ginger, mustard seeds)", "Green tea or tulsi tea"]
    },
    lunch: {
      time: "12:00 PM – 1:30 PM",
      items: ["Barley or millet khichdi with minimal oil", "Steamed or sautéed vegetables (broccoli, cabbage, spinach)", "Lentil soup with black pepper and ginger", "Warm herbal drink: Trikatu tea"]
    },
    eveningSnack: {
      time: "5:00 PM – 6:00 PM",
      items: ["Roasted chickpeas or puffed rice with lemon and salt", "Herbal tea (dry ginger or tulsi)"]
    },
    dinner: {
      time: "7:00 PM – 8:00 PM",
      items: ["Clear vegetable soup or moong dal soup", "Light chapati with sautéed greens"]
    },
    avoid: ["Sugary, oily, or fried foods", "Cold drinks", "Excessive dairy"],
    favors: ["Spicy, bitter, astringent foods; dry and warm meals"]
  }
};

// GET /api/dosha/diet - Get personalized diet plan (pro users only, requires auth)
router.get("/diet", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("accountType doshaBodyType");
    if (!user) return res.status(404).json({ error: "User not found" });

    // check pro status and expiry
    const now = new Date();
    if (user.accountType !== "pro" || !user.proExpiresAt || user.proExpiresAt < now) {
      // if accountType is 'pro' but subscription expired, downgrade automatically
      if (user.accountType === "pro" && user.proExpiresAt && user.proExpiresAt < now) {
        user.accountType = "free";
        user.proExpiresAt = undefined;
        user.proPaidAt = undefined;
        await user.save();
      }
      return res.status(403).json({
        error: "Upgrade required",
        message: "Personalized diet plans are available to Pro users only."
      });
    }

    if (!user.doshaBodyType) {
      return res.status(400).json({
        error: "Quiz required",
        message: "Take the dosha quiz first to receive a personalized diet plan."
      });
    }

    const plan = dietPlans[user.doshaBodyType] || dietPlans["Kapha"];
    return res.json({ dosha: user.doshaBodyType, plan });
  } catch (err) {
    console.error("Error fetching diet plan:", err);
    res.status(500).json({ error: "Failed to fetch diet plan" });
  }
});

// Helper function to provide dosha-specific recommendations
function getDoshaRecommendations(dosha) {
  const recommendations = {
    "Vata": {
      description: "Vata types are typically energetic, creative, and quick-thinking but may experience anxiety and digestive issues.",
      diet: "Favor warm, cooked foods; avoid cold, raw foods. Include healthy fats and warming spices.",
      lifestyle: "Maintain regular routines, get adequate rest, practice calming activities like yoga and meditation.",
      tips: ["Stay warm", "Avoid excessive travel", "Regular meal times", "Oil massage (abhyanga)"]
    },
    "Pitta": {
      description: "Pitta types are typically intelligent, focused, and determined but may experience inflammation and anger.",
      diet: "Favor cooling foods; avoid spicy, fried, and acidic foods. Include sweet fruits and vegetables.",
      lifestyle: "Avoid overheating, practice moderation, engage in calming activities.",
      tips: ["Stay cool", "Avoid excessive sun", "Practice patience", "Cooling activities like swimming"]
    },
    "Kapha": {
      description: "Kapha types are typically calm, stable, and compassionate but may experience weight gain and lethargy.",
      diet: "Favor light, dry foods; avoid heavy, oily foods. Include spices and bitter vegetables.",
      lifestyle: "Stay active, avoid oversleeping, engage in stimulating activities.",
      tips: ["Regular exercise", "Avoid daytime naps", "Wake up early", "Dry brushing"]
    },
    "Vata-Pitta": {
      description: "You have characteristics of both Vata and Pitta doshas.",
      diet: "Balance warm, nourishing foods with cooling elements.",
      lifestyle: "Maintain routine while allowing flexibility. Balance activity with rest.",
      tips: ["Adapt to seasons", "Balance warmth and cooling", "Regular but not excessive exercise"]
    },
    "Pitta-Kapha": {
      description: "You have characteristics of both Pitta and Kapha doshas.",
      diet: "Favor light, cooling foods. Avoid heavy, oily, and spicy foods.",
      lifestyle: "Stay active and cool. Avoid overheating and overeating.",
      tips: ["Regular exercise", "Cooling practices", "Light meals", "Active lifestyle"]
    },
    "Vata-Kapha": {
      description: "You have characteristics of both Vata and Kapha doshas.",
      diet: "Favor warm, light foods with moderate spices.",
      lifestyle: "Maintain regular routine with adequate activity.",
      tips: ["Regular warm meals", "Moderate exercise", "Consistent sleep schedule"]
    },
    "Tridoshic": {
      description: "You have a balanced constitution with all three doshas equally present.",
      diet: "Maintain a balanced diet with variety.",
      lifestyle: "Adapt to seasonal changes and maintain overall balance.",
      tips: ["Listen to your body", "Seasonal adjustments", "Balanced lifestyle", "Variety in diet"]
    }
  };

  return recommendations[dosha] || recommendations["Tridoshic"];
}

module.exports = router;