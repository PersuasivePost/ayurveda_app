import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/QuickRemedies.css";

const remedies = {
  Acne: {
    description:
      "Acne is often linked to excess Pitta (heat) in the body. Cooling and detoxifying practices help balance it.",
    diet: [
      "Include cooling foods like cucumber, melons, and leafy greens.",
      "Avoid oily, spicy, and fried foods.",
      "Drink plenty of water and coconut water.",
    ],
    plants: [
      "Neem – purifies the blood and clears skin.",
      "Aloe Vera – cools the body and promotes skin healing.",
      "Turmeric – natural anti-inflammatory and antibacterial.",
    ],
  },
  Headache: {
    description:
      "Headaches can be caused by stress, dehydration, or aggravated Vata or Pitta doshas.",
    diet: [
      "Avoid skipping meals and stay hydrated.",
      "Drink herbal teas like ginger or tulsi.",
      "Avoid excessive caffeine and sour foods.",
    ],
    plants: [
      "Brahmi – calms the mind and improves clarity.",
      "Peppermint – relieves tension headaches.",
      "Ashwagandha – reduces stress and anxiety.",
    ],
  },
  Cold: {
    description:
      "Colds occur when Kapha increases, leading to congestion and sluggishness.",
    diet: [
      "Eat warm, light foods like soups and kitchari.",
      "Avoid dairy and cold drinks.",
      "Add black pepper and ginger to your meals.",
    ],
    plants: [
      "Tulsi – boosts immunity and clears congestion.",
      "Ginger – warms and improves digestion.",
      "Turmeric – supports respiratory health.",
    ],
  },
  Indigestion: {
    description:
      "Poor digestion can come from low digestive fire (Agni) or improper eating habits.",
    diet: [
      "Eat freshly cooked, warm meals.",
      "Avoid overeating and cold foods.",
      "Sip warm water throughout the day.",
    ],
    plants: [
      "Triphala – supports digestion and detox.",
      "Ginger – stimulates digestive fire.",
      "Fennel – reduces bloating and gas.",
    ],
  },
  Anxiety: {
    description:
      "Anxiety is related to excess Vata — imbalance in air and space elements. Calming routines help ground it.",
    diet: [
      "Eat warm, oily, and nourishing foods.",
      "Avoid caffeine and processed snacks.",
      "Follow regular meal and sleep schedules.",
    ],
    plants: [
      "Ashwagandha – reduces stress and promotes calm.",
      "Brahmi – soothes the nervous system.",
      "Jatamansi – promotes restful sleep and mental balance.",
    ],
  },
  Hairfall: {
    description:
      "Hair fall can be due to stress, poor nutrition, or excess Pitta heat affecting the scalp.",
    diet: [
      "Eat iron-rich foods like spinach, sesame, and amla.",
      "Avoid spicy and acidic foods.",
      "Massage scalp with warm coconut or bhringraj oil.",
    ],
    plants: [
      "Bhringraj – promotes hair growth.",
      "Amla – rich in Vitamin C and strengthens hair roots.",
      "Hibiscus – nourishes hair and prevents breakage.",
    ],
  },
  Fatigue: {
    description:
      "Fatigue occurs when body energy (Ojas) is low. Proper rest, nutrition, and herbs restore vitality.",
    diet: [
      "Eat nutrient-rich foods like dates, ghee, and milk.",
      "Avoid skipping meals.",
      "Get consistent sleep and moderate exercise.",
    ],
    plants: [
      "Ashwagandha – builds stamina and strength.",
      "Shatavari – restores energy and hydration.",
      "Licorice – supports adrenal function.",
    ],
  },
};

// Navigation Component for Remedies Page
function RemediesNavigation() {
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
          <li><Link to="/dosha-quiz" className="nav-link">Dosha Quiz</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default function QuickRemedies() {
  const [selectedProblem, setSelectedProblem] = useState("");
  const problemList = Object.keys(remedies);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="remedies-page">
      <RemediesNavigation />
      
      <div className="remedy-container">
        <h2 className="remedy-title">🌿 Ayurvedic Quick Remedies</h2>
        <p className="remedy-subtitle">
          Select a common issue to view Ayurvedic remedies, diet, and healing plants.
        </p>

        <div className="dropdown-section">
          <select
            className="remedy-dropdown"
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
          >
            <option value="">-- Select a Problem --</option>
            {problemList.map((problem) => (
              <option key={problem} value={problem}>
                {problem}
              </option>
            ))}
          </select>
        </div>

        {selectedProblem && (
          <div className="remedy-card">
            <h3>{selectedProblem}</h3>
            <p className="description">{remedies[selectedProblem].description}</p>

            <div className="remedy-section">
              <h4>🍽️ Recommended Diet</h4>
              <ul>
                {remedies[selectedProblem].diet.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="remedy-section">
              <h4>🌱 Useful Plants & Herbs</h4>
              <ul>
                {remedies[selectedProblem].plants.map((plant, i) => (
                  <li key={i}>{plant}</li>
                ))}
              </ul>
            </div>

            <div className="remedy-actions">
              <Link to="/#consultation" className="consult-link">
                📅 Book Consultation for Personalized Treatment
              </Link>
              <Link to="/dosha-quiz" className="quiz-link">
                🔮 Take Dosha Quiz for Better Understanding
              </Link>
            </div>
          </div>
        )}

        {!selectedProblem && (
          <div className="no-selection">
            <div className="remedy-preview">
              <h3>🌺 Natural Healing at Your Fingertips</h3>
              <p>Choose from common health issues above to discover:</p>
              <div className="feature-grid">
                <div className="feature-item">
                  <span className="feature-icon">🍽️</span>
                  <span>Dietary Recommendations</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🌱</span>
                  <span>Herbal Remedies</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🧘</span>
                  <span>Lifestyle Tips</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">⚖️</span>
                  <span>Dosha Balancing</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}