

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronRight, Leaf, Droplet, Flame, Apple, Wind, Sun, Snowflake } from "lucide-react"

export default function LearnAyurveda() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"seasons" | "doshas" | "practices">("seasons")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const seasons = [
    {
      name: "Spring (Vasant)",
      period: "March - May",
      element: "Earth & Water",
      dosha: "Kapha",
      icon: Leaf,
      color: "secondary",
      practices: [
        "Dry body massage (Udvartana)",
        "Pranayama and light yoga",
        "Herbal steam therapies",
        "Morning walks in nature",
      ],
      herbs: ["Turmeric", "Black Pepper", "Ginger", "Fenugreek", "Neem"],
      foods: ["Bitter greens", "Legumes", "Light grains", "Honey", "Warming spices"],
      diet: "Eat light, warming foods. Avoid heavy, oily, and cold foods. Include stimulating spices to enhance digestion.",
    },
    {
      name: "Summer (Grishma)",
      period: "June - August",
      element: "Fire & Water",
      dosha: "Pitta",
      icon: Flame,
      color: "primary",
      practices: [
        "Cooling oil massage (Abhyanga)",
        "Swimming and water activities",
        "Early morning meditation",
        "Evening yoga",
      ],
      herbs: ["Coconut oil", "Sandalwood", "Brahmi", "Licorice", "Hibiscus"],
      foods: ["Leafy greens", "Sweet fruits", "Cooling grains", "Coconut products", "Fresh dairy"],
      diet: "Favor cooling and refreshing foods. Avoid excessive heat, spicy, and acidic foods. Drink plenty of water.",
    },
    {
      name: "Autumn (Sharad)",
      period: "September - November",
      element: "Air & Space",
      dosha: "Vata",
      icon: Wind,
      color: "accent",
      practices: [
        "Warm oil massage (Abhyanga)",
        "Grounding yoga",
        "Aromatherapy with warm oils",
        "Meditation for stability",
      ],
      herbs: ["Sesame oil", "Ashwagandha", "Shatavari", "Bala", "Vacha"],
      foods: ["Warm soups", "Whole grains", "Root vegetables", "Healthy oils", "Nuts & seeds"],
      diet: "Eat warm, cooked meals. Avoid cold, dry, and raw foods. Include grounding spices and nourishing fats.",
    },
    {
      name: "Winter (Hemant)",
      period: "December - February",
      element: "Earth & Water",
      dosha: "Kapha",
      icon: Snowflake,
      color: "secondary",
      practices: ["Deep heating massage", "Vigorous exercise", "Sauna and steam rooms", "Dynamic yoga practices"],
      herbs: ["Black Pepper", "Cardamom", "Cinnamon", "Clove", "Dry Ginger"],
      foods: ["Warm grains", "Heating spices", "Protein-rich foods", "Root vegetables", "Warming oils"],
      diet: "Eat warming, energizing foods. Include heating spices and nourishing proteins. Stay active and maintain warmth.",
    },
  ]

  const doshas = [
    {
      name: "Vata",
      subtitle: "Air & Space Element",
      color: "secondary",
      icon: Droplet,
      qualities: "Cold, Light, Dry, Mobile, Subtle",
      characteristics: [
        "Governs all movement in body and mind",
        "Controls nervous system and communication",
        "Responsible for breathing, circulation, and elimination",
      ],
      balance: [
        "Warm, grounding foods",
        "Consistent routine",
        "Regular oil massage",
        "Adequate rest and sleep",
        "Meditative practices",
      ],
      imbalance: "Anxiety, insomnia, dry skin, constipation, joint pain",
    },
    {
      name: "Pitta",
      subtitle: "Fire & Water Element",
      color: "primary",
      icon: Flame,
      qualities: "Hot, Light, Sharp, Penetrating, Liquid",
      characteristics: [
        "Governs metabolism and digestion",
        "Controls body temperature and vision",
        "Responsible for intelligence and courage",
      ],
      balance: [
        "Cooling foods and drinks",
        "Avoiding excess heat",
        "Moderate exercise",
        "Calming meditation",
        "Oil massage with cool oils",
      ],
      imbalance: "Heartburn, inflammation, irritability, skin issues, excess sweating",
    },
    {
      name: "Kapha",
      subtitle: "Earth & Water Element",
      color: "accent",
      icon: Apple,
      qualities: "Cold, Heavy, Slow, Stable, Smooth",
      characteristics: [
        "Governs structure and cohesion",
        "Maintains immunity and strength",
        "Responsible for stability and patience",
      ],
      balance: [
        "Light, warm foods",
        "Regular exercise",
        "Stimulating massage",
        "Variety in routine",
        "Engaging activities",
      ],
      imbalance: "Weight gain, lethargy, congestion, attachment, sluggishness",
    },
  ]

  const practices = [
    {
      title: "Abhyanga (Oil Massage)",
      description:
        "Therapeutic full-body oil massage that nourishes tissues, improves circulation, and calms the nervous system.",
      frequency: "3-4 times weekly",
      benefits: ["Improves skin health", "Enhances circulation", "Reduces anxiety", "Promotes sleep"],
    },
    {
      title: "Pranayama (Breath Work)",
      description:
        "Controlled breathing techniques that balance the doshas, calm the mind, and increase vital energy (prana).",
      frequency: "Daily, 10-15 minutes",
      benefits: ["Calms mind", "Increases energy", "Improves focus", "Reduces stress"],
    },
    {
      title: "Meditation",
      description: "Mindfulness and meditation practices to harmonize body, mind, and spirit with nature's rhythms.",
      frequency: "Daily, 20 minutes",
      benefits: ["Mental clarity", "Emotional balance", "Spiritual growth", "Better sleep"],
    },
    {
      title: "Yoga",
      description: "Gentle to vigorous yoga practices customized to your dosha constitution for optimal balance.",
      frequency: "4-5 times weekly",
      benefits: ["Increased flexibility", "Strength building", "Better digestion", "Improved posture"],
    },
  ]

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
              Comprehensive Ayurvedic Knowledge
            </span>
          </div>
          <h1
            className={`text-5xl md:text-6xl font-bold text-foreground text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            Learn <span className="text-primary">Ayurveda</span>
          </h1>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            Explore ancient Ayurvedic wisdom, seasonal guidance, doshas, therapeutic practices, and lifestyle
            recommendations for optimal health and wellness.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sticky top-16 bg-background/95 backdrop-blur z-40 border-b border-border/40">
        <div className="mx-auto max-w-7xl">
          <div className="flex gap-4 overflow-x-auto">
            {[
              { id: "seasons", label: "Seasonal Wisdom", icon: Sun },
              { id: "doshas", label: "Three Doshas", icon: Wind },
              { id: "practices", label: "Practices", icon: Leaf },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Seasonal Wisdom Tab */}
      {activeTab === "seasons" && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="mx-auto max-w-7xl space-y-12">
            {seasons.map((season, idx) => {
              const Icon = season.icon
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl border border-border/40 overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                >
                  {/* Header */}
                  <div
                    className={`p-8 bg-gradient-to-r from-${season.color}/10 to-${season.color}/5 border-b border-border/40`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-${season.color}/20`}>
                            <Icon className={`w-6 h-6 text-${season.color}`} />
                          </div>
                          <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">{season.name}</h3>
                            <p className={`text-sm font-medium text-${season.color}`}>{season.period}</p>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-4">
                          {season.element} | Dosha: {season.dosha}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Practices */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider">
                        Recommended Practices
                      </h4>
                      <ul className="space-y-3">
                        {season.practices.map((practice, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${season.color}`} />
                            <span className="text-sm text-foreground/80">{practice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Herbs */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider">
                        Beneficial Herbs
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {season.herbs.map((herb, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-${season.color}/10 text-${season.color} border border-${season.color}/20`}
                          >
                            {herb}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Foods */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider">Seasonal Foods</h4>
                      <div className="flex flex-wrap gap-2">
                        {season.foods.map((food, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-${season.color}/10 text-${season.color} border border-${season.color}/20`}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Diet Tips */}
                  <div className={`px-8 py-6 bg-${season.color}/5 border-t border-border/40`}>
                    <p className="text-sm text-foreground/80 leading-relaxed">{season.diet}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Doshas Tab */}
      {activeTab === "doshas" && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="mx-auto max-w-7xl space-y-12">
            {doshas.map((dosha, idx) => {
              const Icon = dosha.icon
              return (
                <div
                  key={idx}
                  className={`group rounded-2xl border border-border/40 overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.2 * (idx + 1)}s` }}
                >
                  {/* Header */}
                  <div
                    className={`p-8 bg-gradient-to-r from-${dosha.color}/10 to-${dosha.color}/5 border-b border-border/40`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-${dosha.color}/20`}>
                            <Icon className={`w-6 h-6 text-${dosha.color}`} />
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-foreground">{dosha.name}</h3>
                            <p className={`text-sm font-medium text-${dosha.color}`}>{dosha.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider mb-3">
                          Key Qualities
                        </h4>
                        <p className="text-foreground/80">{dosha.qualities}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider mb-3">
                          Characteristics
                        </h4>
                        <ul className="space-y-2">
                          {dosha.characteristics.map((char, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${dosha.color}`} />
                              <span className="text-sm text-foreground/80">{char}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-foreground uppercase text-sm tracking-wider mb-3">
                          Balancing Tips
                        </h4>
                        <ul className="space-y-2">
                          {dosha.balance.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${dosha.color}`} />
                              <span className="text-sm text-foreground/80">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`p-4 rounded-lg bg-${dosha.color}/5 border border-${dosha.color}/20`}>
                        <p className="text-sm font-medium text-foreground mb-2">Imbalance Signs:</p>
                        <p className="text-sm text-foreground/80">{dosha.imbalance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Practices Tab */}
      {activeTab === "practices" && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {practices.map((practice, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border border-border/40 overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.15 * (idx + 1)}s` }}
                >
                  <div className="p-8 space-y-6">
                    <h3 className="text-2xl font-bold text-foreground">{practice.title}</h3>
                    <p className="text-foreground/80 leading-relaxed">{practice.description}</p>

                    <div className="border-t border-border/40 pt-4">
                      <p className="text-sm font-semibold text-primary mb-2">Recommended Frequency</p>
                      <p className="text-sm text-foreground/80">{practice.frequency}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-primary mb-3">Key Benefits</p>
                      <ul className="space-y-2">
                        {practice.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Ready to Begin Your Ayurvedic Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take our personalized body type quiz to discover your unique dosha constitution and receive customized
            wellness recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/quiz">
              <Button size="lg" className="bg-primary hover:bg-primary/90 btn-hover-lift gap-2">
                Take Dosha Quiz
                <ChevronRight size={18} />
              </Button>
            </Link>
            <Link href="/doctors">
              <Button size="lg" variant="outline" className="btn-hover-lift bg-transparent">
                Consult with Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
