

import { useState } from "react"
import { Link } from "react-router-dom"

interface Remedy {
  symptom: string
  icon: string
  color: string
  remedies: string[]
  description: string
}

const remedyData: Remedy[] = [
  {
    symptom: "Headache",
    icon: "🤕",
    color: "primary",
    remedies: [
      "Massage temples with sesame oil",
      "Drink ginger-lemon tea",
      "Apply cool coconut oil",
      "Rest in cool environment",
    ],
    description: "Calm tension and migraine naturally",
  },
  {
    symptom: "Acne & Pimples",
    icon: "💧",
    color: "secondary",
    remedies: ["Apply neem paste", "Turmeric and milk mask", "Drink more water", "Avoid fried, oily foods"],
    description: "Clear skin with natural ingredients",
  },
  {
    symptom: "Hair Fall",
    icon: "💇",
    color: "accent",
    remedies: [
      "Oil head massage with brahmi oil",
      "Eat sesame seeds",
      "Coconut oil treatment",
      "Reduce stress and sleep well",
    ],
    description: "Strengthen hair roots naturally",
  },
  {
    symptom: "Digestion Issues",
    icon: "🫖",
    color: "primary",
    remedies: ["Drink warm lemon water", "Consume ginger daily", "Eat light meals", "Add cumin and coriander"],
    description: "Balance your agni (digestive fire)",
  },
  {
    symptom: "Insomnia",
    icon: "😴",
    color: "secondary",
    remedies: ["Warm milk with ghee", "Meditation before bed", "Oil massage (abhyanga)", "Avoid caffeine evening"],
    description: "Sleep better with Ayurvedic herbs",
  },
  {
    symptom: "Joint Pain",
    icon: "🦵",
    color: "accent",
    remedies: ["Warm sesame oil massage", "Turmeric milk daily", "Gentle yoga practice", "Avoid cold foods"],
    description: "Ease pain and stiffness",
  },
]

export function QuickRemedies() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)
  const selectedData = remedyData.find((r) => r.symptom === selectedSymptom)

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/3 to-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <span className="text-sm font-medium text-primary">Quick Relief</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Instant Ayurvedic Remedies for Common Issues
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find immediate relief for everyday ailments with time-tested Ayurvedic remedies and natural solutions
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {remedyData.map((remedy) => (
            <button
              key={remedy.symptom}
              onClick={() => setSelectedSymptom(remedy.symptom)}
              className={`relative group p-4 rounded-xl border-2 transition-all duration-300 text-center cursor-pointer ${
                selectedSymptom === remedy.symptom
                  ? `border-${remedy.color} bg-${remedy.color}/10`
                  : "border-border/40 bg-card/50 hover:border-border/60"
              }`}
            >
              <div className="text-3xl mb-2">{remedy.icon}</div>
              <p className="text-xs md:text-sm font-semibold text-foreground">{remedy.symptom}</p>
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-5 bg-gradient-to-br from-${remedy.color} to-transparent transition-opacity pointer-events-none`}
              />
            </button>
          ))}
        </div>

        {selectedData ? (
          <div className="animate-fade-in-up">
            <div
              className={`relative rounded-2xl border-2 border-${selectedData.color}/30 overflow-hidden bg-card/60 backdrop-blur-sm p-8 md:p-10`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-${selectedData.color}/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 opacity-60" />

              <div className="relative space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="text-5xl mb-3">{selectedData.icon}</div>
                    <h3 className="text-3xl font-bold text-foreground">{selectedData.symptom}</h3>
                    <p className={`text-sm font-medium text-${selectedData.color}`}>{selectedData.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Remedies</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedData.remedies.map((remedy, idx) => (
                      <div
                        key={idx}
                        className={`flex items-start gap-3 p-4 rounded-lg bg-${selectedData.color}/5 border border-${selectedData.color}/10`}
                      >
                        <div className={`w-2 h-2 rounded-full bg-${selectedData.color} flex-shrink-0 mt-2`} />
                        <p className="text-sm text-foreground/80">{remedy}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/30 flex flex-col sm:flex-row gap-4">
                  <Link to="/doctors" className="flex-1">
                    <button
                      className={`w-full px-6 py-3 rounded-lg bg-${selectedData.color} hover:bg-${selectedData.color}/90 text-${selectedData.color}-foreground font-medium transition-all duration-300 hover:-translate-y-1`}
                    >
                      Consult a Doctor
                    </button>
                  </Link>
                  <button className="flex-1 px-6 py-3 rounded-lg border border-border bg-background hover:bg-muted transition-all duration-300 font-medium">
                    Save Remedy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select a symptom above to see quick Ayurvedic remedies</p>
          </div>
        )}
      </div>
    </section>
  )
}
