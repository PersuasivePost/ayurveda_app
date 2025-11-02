// Dosha Quiz Logic

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export interface QuizOption {
  text: string
  vata: number
  pitta: number
  kapha: number
}

export interface QuizResult {
  primaryDosha: "vata" | "pitta" | "kapha"
  secondaryDosha: "vata" | "pitta" | "kapha"
  scores: {
    vata: number
    pitta: number
    kapha: number
  }
  percentages: {
    vata: number
    pitta: number
    kapha: number
  }
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "1",
    question: "What best describes your body frame?",
    options: [
      { text: "Thin and light", vata: 3, pitta: 0, kapha: 0 },
      { text: "Medium and muscular", vata: 0, pitta: 3, kapha: 0 },
      { text: "Heavy and sturdy", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "2",
    question: "How do you typically feel?",
    options: [
      { text: "Anxious or worried", vata: 3, pitta: 0, kapha: 0 },
      { text: "Irritable or frustrated", vata: 0, pitta: 3, kapha: 0 },
      { text: "Content and calm", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "3",
    question: "What is your appetite like?",
    options: [
      { text: "Variable and irregular", vata: 3, pitta: 0, kapha: 0 },
      { text: "Strong and consistent", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow and steady", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "4",
    question: "How is your digestion?",
    options: [
      { text: "Easily bloated", vata: 3, pitta: 0, kapha: 0 },
      { text: "Good and fast", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow and heavy", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "5",
    question: "What is your sleep pattern?",
    options: [
      { text: "Light and easily disturbed", vata: 3, pitta: 0, kapha: 0 },
      { text: "Moderate and regular", vata: 0, pitta: 3, kapha: 0 },
      { text: "Deep and long", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "6",
    question: "How do you handle change?",
    options: [
      { text: "Restless and uncomfortable", vata: 3, pitta: 0, kapha: 0 },
      { text: "Adapt but may control", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow to accept", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "7",
    question: "Your skin tends to be:",
    options: [
      { text: "Dry and rough", vata: 3, pitta: 0, kapha: 0 },
      { text: "Sensitive and warm", vata: 0, pitta: 3, kapha: 0 },
      { text: "Oily and thick", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "8",
    question: "Your hair is typically:",
    options: [
      { text: "Thin and dry", vata: 3, pitta: 0, kapha: 0 },
      { text: "Fine and early graying", vata: 0, pitta: 3, kapha: 0 },
      { text: "Thick and oily", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "9",
    question: "How do you prefer temperatures?",
    options: [
      { text: "Warm and humid", vata: 3, pitta: 0, kapha: 0 },
      { text: "Cool and moderate", vata: 0, pitta: 3, kapha: 0 },
      { text: "Warm and dry", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "10",
    question: "Your natural energy level is:",
    options: [
      { text: "High but erratic", vata: 3, pitta: 0, kapha: 0 },
      { text: "Moderate and focused", vata: 0, pitta: 3, kapha: 0 },
      { text: "Steady and sustained", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "11",
    question: "Your memory is typically:",
    options: [
      { text: "Quick to learn, quick to forget", vata: 3, pitta: 0, kapha: 0 },
      { text: "Good and sharp", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow to learn, good retention", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "12",
    question: "Your voice is generally:",
    options: [
      { text: "Soft and weak", vata: 3, pitta: 0, kapha: 0 },
      { text: "Sharp and clear", vata: 0, pitta: 3, kapha: 0 },
      { text: "Deep and resonant", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "13",
    question: "Your spending habits are:",
    options: [
      { text: "Impulsive", vata: 3, pitta: 0, kapha: 0 },
      { text: "Practical and measured", vata: 0, pitta: 3, kapha: 0 },
      { text: "Conservative", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "14",
    question: "When stressed, you tend to:",
    options: [
      { text: "Feel anxious and scattered", vata: 3, pitta: 0, kapha: 0 },
      { text: "Become irritable and controlling", vata: 0, pitta: 3, kapha: 0 },
      { text: "Withdraw and isolate", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: "15",
    question: "Your speech pattern is:",
    options: [
      { text: "Fast and talkative", vata: 3, pitta: 0, kapha: 0 },
      { text: "Moderate and articulate", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow and thoughtful", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
]

export function calculateResult(answers: number[]): QuizResult {
  let vataScore = 0
  let pittaScore = 0
  let kaphaScore = 0

  answers.forEach((optionIndex, questionIndex) => {
    const option = QUIZ_QUESTIONS[questionIndex].options[optionIndex]
    vataScore += option.vata
    pittaScore += option.pitta
    kaphaScore += option.kapha
  })

  const total = vataScore + pittaScore + kaphaScore
  const vataPercent = Math.round((vataScore / total) * 100)
  const pittaPercent = Math.round((pittaScore / total) * 100)
  const kaphaPercent = Math.round((kaphaScore / total) * 100)

  // Determine primary and secondary doshas
  const scores = { vata: vataScore, pitta: pittaScore, kapha: kaphaScore }
  const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a)

  const primaryDosha = sorted[0][0] as "vata" | "pitta" | "kapha"
  const secondaryDosha = sorted[1][0] as "vata" | "pitta" | "kapha"

  return {
    primaryDosha,
    secondaryDosha,
    scores: { vata: vataScore, pitta: pittaScore, kapha: kaphaScore },
    percentages: { vata: vataPercent, pitta: pittaPercent, kapha: kaphaPercent },
  }
}

export const DOSHA_INFO = {
  vata: {
    name: "Vata",
    element: "Air & Space",
    color: "bg-secondary",
    description: "The energy of movement and change",
    traits: [
      "Creative and imaginative",
      "Quick-thinking and versatile",
      "Energetic but may lack grounding",
      "Sensitive to cold",
      "Loves variety and stimulation",
    ],
    recommendations: {
      diet: "Warm, grounding foods like root vegetables, warm grains, and healthy fats",
      lifestyle: "Establish routines, practice grounding activities, avoid excessive travel",
      exercise: "Gentle practices like yoga, tai chi, and walking",
      herbs: "Ashwagandha, Brahmi, Sesame oil",
    },
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    color: "bg-primary",
    description: "The energy of transformation and metabolism",
    traits: [
      "Goal-oriented and ambitious",
      "Sharp intellect and strong digestion",
      "Natural leader and decisive",
      "Can become competitive or impatient",
      "Sensitive to heat",
    ],
    recommendations: {
      diet: "Cooling foods like leafy greens, fresh fruits, and coconut",
      lifestyle: "Cool environments, avoid excessive heat, practice relaxation",
      exercise: "Swimming, cycling, evening yoga",
      herbs: "Brahmi, Neem, Turmeric, Coconut oil",
    },
  },
  kapha: {
    name: "Kapha",
    element: "Water & Earth",
    color: "bg-accent",
    description: "The energy of stability and structure",
    traits: [
      "Calm, grounded, and loyal",
      "Natural nurturer and supportive",
      "Strong immunity and stamina",
      "Can become stubborn or sedentary",
      "Loves comfort and routine",
    ],
    recommendations: {
      diet: "Light, warming foods like spices, legumes, and seasonal vegetables",
      lifestyle: "Regular movement, new experiences, avoid excessive napping",
      exercise: "Vigorous activities like running, dancing, and weight training",
      herbs: "Ginger, Black pepper, Turmeric, Triphala",
    },
  },
}
