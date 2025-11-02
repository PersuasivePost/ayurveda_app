import { PageLayout } from "@/components/layout/page-layout"

export default function LearnAyurveda() {
  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Learn Ayurveda</h1>
            <p className="text-lg text-muted-foreground">
              Explore ancient wisdom and modern applications of Ayurvedic principles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Seasonal Wisdom", desc: "Learn how to align with nature's cycles", icon: "🌸" },
              { title: "Dosha Guide", desc: "Deep dive into Vata, Pitta, and Kapha", icon: "⚖️" },
              { title: "Diet & Nutrition", desc: "Personalized eating for your constitution", icon: "🥗" },
              { title: "Daily Routines", desc: "Establish healthy Ayurvedic habits", icon: "☀️" },
              { title: "Herbal Remedies", desc: "Natural solutions for common ailments", icon: "🌿" },
              { title: "Yoga & Meditation", desc: "Mind-body practices for balance", icon: "🧘" },
            ].map((topic, idx) => (
              <div key={idx} className="bg-card border border-border rounded-lg p-8 space-y-4 text-center">
                <div className="text-5xl">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                <p className="text-sm text-muted-foreground">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
