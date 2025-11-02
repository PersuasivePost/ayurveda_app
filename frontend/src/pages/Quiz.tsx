import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Quiz() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Discover Your Ayurvedic Body Type</h1>
          <p className="text-lg text-muted-foreground">
            Understanding your unique constitution (Prakruti) is the foundation of personalized wellness
          </p>
        </div>
      </section>

      {/* Body Types Introduction */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Three Doshas</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ayurveda recognizes three fundamental body types called doshas, which represent different patterns of
              energy in the body
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Vata",
                element: "Air & Space",
                color: "bg-secondary",
                traits: ["Slim build", "Energetic", "Creative", "Irregular appetite"],
                emoji: "💨",
              },
              {
                name: "Pitta",
                element: "Fire & Water",
                color: "bg-primary",
                traits: ["Medium build", "Focused", "Ambitious", "Strong digestion"],
                emoji: "🔥",
              },
              {
                name: "Kapha",
                element: "Water & Earth",
                color: "bg-accent",
                traits: ["Sturdy build", "Calm", "Loyal", "Slow metabolism"],
                emoji: "🌍",
              },
            ].map((dosha, idx) => (
              <div key={idx} className={`p-8 rounded-xl border border-border/40 ${dosha.color}/10 space-y-4`}>
                <div className="text-4xl text-center">{dosha.emoji}</div>
                <h3 className="text-2xl font-bold text-foreground text-center">{dosha.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{dosha.element}</p>
                <ul className="space-y-2">
                  {dosha.traits.map((trait, i) => (
                    <li key={i} className="text-sm text-muted-foreground">• {trait}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link to="/quiz/start">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Your Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
