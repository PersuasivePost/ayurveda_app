import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
              <div key={idx} className={`rounded-lg p-8 text-white space-y-4 ${dosha.color}`}>
                <div className="text-5xl">{dosha.emoji}</div>
                <div>
                  <h3 className="text-2xl font-bold">{dosha.name}</h3>
                  <p className="text-sm opacity-90">{dosha.element}</p>
                </div>
                <ul className="space-y-1 text-sm">
                  {dosha.traits.map((trait, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span>•</span> {trait}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz Info */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">How the Quiz Works</h2>
            <ul className="space-y-4">
              {[
                "Answer 20 carefully designed questions about your physical and mental characteristics",
                "Get instant results with your primary and secondary doshas",
                "Receive personalized wellness recommendations",
                "Connect with doctors specializing in your constitution",
                "Get custom product recommendations for your body type",
              ].map((step, idx) => (
                <li key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>
                  <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground">
            Take the 5-minute quiz to unlock your personalized wellness journey
          </p>
          <Link href="/quiz/start">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start the Quiz Now
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
