import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/DoshaQuiz.css";

const questions = [
  {
    id: 1,
    question: "How would you describe your body type?",
    options: [
      { text: "Slim, light, often cold", dosha: "Vata" },
      { text: "Medium build, muscular, warm", dosha: "Pitta" },
      { text: "Sturdy, heavy, gains weight easily", dosha: "Kapha" },
    ],
  },
  {
    id: 2,
    question: "How is your appetite and digestion?",
    options: [
      { text: "Irregular, sometimes skips meals", dosha: "Vata" },
      { text: "Strong appetite, gets irritated when hungry", dosha: "Pitta" },
      { text: "Slow digestion, prefers light food", dosha: "Kapha" },
    ],
  },
  {
    id: 3,
    question: "How is your sleep pattern?",
    options: [
      { text: "Light, easily disturbed", dosha: "Vata" },
      { text: "Moderate, 6–8 hours", dosha: "Pitta" },
      { text: "Heavy, long, hard to wake up", dosha: "Kapha" },
    ],
  },
  {
    id: 4,
    question: "How do you react to stress?",
    options: [
      { text: "Anxious or worried", dosha: "Vata" },
      { text: "Irritated or angry", dosha: "Pitta" },
      { text: "Withdrawn or sluggish", dosha: "Kapha" },
    ],
  },
  {
    id: 5,
    question: "Which describes your energy levels best?",
    options: [
      { text: "Variable – bursts of energy followed by fatigue", dosha: "Vata" },
      { text: "Consistent and intense", dosha: "Pitta" },
      { text: "Slow to start but lasts long", dosha: "Kapha" },
    ],
  },
  {
    id: 6,
    question: "How do you handle weather changes?",
    options: [
      { text: "Hate the cold, skin gets dry", dosha: "Vata" },
      { text: "Feel uncomfortable in heat", dosha: "Pitta" },
      { text: "Do fine in most weather but dislike humidity", dosha: "Kapha" },
    ],
  },
  {
    id: 7,
    question: "Which best describes your personality?",
    options: [
      { text: "Creative, quick to learn, easily distracted", dosha: "Vata" },
      { text: "Focused, ambitious, perfectionist", dosha: "Pitta" },
      { text: "Calm, caring, dependable", dosha: "Kapha" },
    ],
  },
  {
    id: 8,
    question: "How is your memory?",
    options: [
      { text: "Quick to learn but forgets easily", dosha: "Vata" },
      { text: "Sharp and precise", dosha: "Pitta" },
      { text: "Slow to learn but remembers for long", dosha: "Kapha" },
    ],
  },
  {
    id: 9,
    question: "What best describes your speech style?",
    options: [
      { text: "Fast, talkative, sometimes unclear", dosha: "Vata" },
      { text: "Clear, direct, confident", dosha: "Pitta" },
      { text: "Calm, slow, pleasant", dosha: "Kapha" },
    ],
  },
  {
    id: 10,
    question: "How do you feel after physical activity?",
    options: [
      { text: "Energized but tired quickly", dosha: "Vata" },
      { text: "Sweaty, hot, and competitive", dosha: "Pitta" },
      { text: "Slow to start but recover well", dosha: "Kapha" },
    ],
  },
];

const doshaDescriptions = {
  Vata: "You are Vata dominant — energetic, creative, and quick-thinking but prone to anxiety and irregular routines. Balance yourself with warmth, routine, and grounding foods.",
  Pitta: "You are Pitta dominant — driven, sharp, and ambitious but prone to anger and overheating. Cooling foods, calmness, and patience help balance your fire.",
  Kapha: "You are Kapha dominant — calm, loyal, and strong but can become sluggish or complacent. Stimulating activity and light foods help keep you in balance.",
};

const doshaIcons = {
  Vata: "🌪️",
  Pitta: "🔥", 
  Kapha: "🌍"
};

const doshaColors = {
  Vata: "#e0f2f1",
  Pitta: "#fff3e0", 
  Kapha: "#f3e5f5"
};

// Navigation Component for Quiz Page
function QuizNavigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>🕉️ AyurVeda</h2>
          </Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/#ayurveda" className="nav-link">Learn Ayurveda</Link></li>
          <li><Link to="/#herbs" className="nav-link">Explore Herbs</Link></li>
          <li><Link to="/#consultation" className="nav-link">Book Consultation</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default function DoshaQuiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelect = (questionId, dosha) => {
    setAnswers((prev) => ({ ...prev, [questionId]: dosha }));
  };

  const calculateDosha = () => {
    const counts = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.values(answers).forEach((d) => counts[d]++);
    const dominant = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );
    setResult(dominant);
    
    // Scroll to result smoothly
    setTimeout(() => {
      const resultElement = document.querySelector('.result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setResult(null);
    // Scroll to top when retaking quiz
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="dosha-quiz-page">
      <QuizNavigation />
      
      <div className="quiz-container">
        <h2 className="quiz-title">🪷 Ayurvedic Dosha Quiz</h2>
        <p className="quiz-subtitle">Discover your unique Ayurvedic constitution with our comprehensive assessment</p>
        
        {!result ? (
          <div className="quiz-content">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">
              Question {Object.keys(answers).length} of {questions.length} completed
            </p>

            {questions.map((q) => (
              <div key={q.id} className="question-block">
                <h3 className="question-title">{q.id}. {q.question}</h3>
                <div className="options-container">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`option ${
                        answers[q.id] === opt.dosha ? "selected" : ""
                      }`}
                      style={{
                        borderColor: answers[q.id] === opt.dosha ? 
                          (opt.dosha === 'Vata' ? '#00695c' : 
                           opt.dosha === 'Pitta' ? '#e65100' : '#4a148c') : '#e0e0e0'
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={opt.dosha}
                        onChange={() => handleSelect(q.id, opt.dosha)}
                        className="option-radio"
                      />
                      <span className="option-text">{opt.text}</span>
                      <span className="dosha-indicator">{doshaIcons[opt.dosha]}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              className="submit-btn"
              onClick={calculateDosha}
              disabled={Object.keys(answers).length < questions.length}
            >
              {Object.keys(answers).length < questions.length 
                ? `Complete ${questions.length - Object.keys(answers).length} more questions`
                : "🔮 See My Dosha"
              }
            </button>
          </div>
        ) : (
          <div 
            className="result-section"
            style={{ backgroundColor: doshaColors[result] }}
          >
            <div className="result-icon-large">{doshaIcons[result]}</div>
            <h3 className="result-title">{result} Dosha Dominant</h3>
            <p className="result-description">{doshaDescriptions[result]}</p>
            
            <div className="dosha-breakdown">
              <h4>Your Dosha Breakdown:</h4>
              <div className="dosha-scores">
                {Object.entries({ Vata: 0, Pitta: 0, Kapha: 0 }).map(([dosha]) => {
                  const count = Object.values(answers).filter(answer => answer === dosha).length;
                  const percentage = Math.round((count / questions.length) * 100);
                  return (
                    <div key={dosha} className="dosha-score">
                      <span className="dosha-name">{doshaIcons[dosha]} {dosha}</span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: dosha === 'Vata' ? '#00695c' : 
                                           dosha === 'Pitta' ? '#e65100' : '#4a148c'
                          }}
                        ></div>
                      </div>
                      <span className="score-percentage">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="result-actions">
              <button
                onClick={handleRetakeQuiz}
                className="retake-btn"
              >
                🔄 Retake Quiz
              </button>
              <Link to="/" className="home-button">
                🏠 Back to Home
              </Link>
              <Link to="/#consultation" className="consult-button">
                📅 Book Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}