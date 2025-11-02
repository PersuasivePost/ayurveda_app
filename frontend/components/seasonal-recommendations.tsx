"use client"

import { useEffect, useState } from "react"
import { Leaf, Wind, Cherry, Zap, Moon, Sun } from "lucide-react"

export function SeasonalRecommendations() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const seasons = [
    {
      name: "Spring (Vata/Kapha)",
      icon: Cherry,
      color: "secondary",
      season: "spring",
      months: "March - May",
      description: "Season of renewal and rejuvenation",
      dosha: "Kapha predominant, Vata increasing",
      practices: [
        "Morning yoga and stretching",
        "Dry massage (Abhyanga) with warm oil",
        "Spring cleanse and detox",
        "Pranayama (breathing exercises)",
        "Early morning walks",
      ],
      herbs: ["Turmeric", "Ginger", "Neem", "Triphala", "Ashwagandha", "Brahmi"],
      foods: ["Leafy greens", "Bitter herbs", "Light grains", "Honey", "Warming spices", "Fresh vegetables"],
      dietTips:
        "Light, warming foods. Avoid heavy, oily meals. Include fresh spring vegetables and bitter greens. Use heating spices like ginger and cumin.",
      benefits: "Improved digestion, body detoxification, increased energy",
    },
    {
      name: "Summer (Pitta)",
      icon: Sun,
      color: "primary",
      season: "summer",
      months: "June - August",
      description: "Season of heat and transformation",
      dosha: "Pitta predominant",
      practices: [
        "Cooling yoga poses",
        "Swimming and water activities",
        "Meditation and relaxation",
        "Oil massage before sunrise",
        "Gentle evening walks",
      ],
      herbs: ["Cooling coconut oil", "Brahmi", "Sandalwood", "Rose", "Mint", "Licorice"],
      foods: ["Cooling fruits", "Leafy greens", "Coconut water", "Fresh dairy", "Sweet grains", "Cucumber & zucchini"],
      dietTips:
        "Favor cooling foods and drinks. Avoid excessive heat, spicy foods, and acidic items. Include coconut water, cucumber, and cooling herbs.",
      benefits: "Better temperature regulation, improved skin, reduced inflammation",
    },
    {
      name: "Autumn (Vata)",
      icon: Wind,
      color: "accent",
      season: "autumn",
      months: "September - November",
      description: "Season of grounding and stability",
      dosha: "Vata predominant",
      practices: [
        "Grounding yoga poses",
        "Warm oil massage (Abhyanga)",
        "Meditation with roots focus",
        "Warm herbal teas",
        "Early bedtime routine",
      ],
      herbs: ["Sesame oil", "Ashwagandha", "Shatavari", "Ghee infusions", "Warming spices", "Adaptogens"],
      foods: ["Root vegetables", "Whole grains", "Healthy fats", "Warm soups", "Nuts & seeds", "Cooked meals"],
      dietTips:
        "Eat warm, cooked meals. Include root vegetables and healthy oils. Avoid cold, dry, raw foods. Add warming spices like cinnamon and nutmeg.",
      benefits: "Improved stability, better digestion, increased body warmth",
    },
    {
      name: "Winter (Kapha)",
      icon: Moon,
      color: "secondary",
      season: "winter",
      months: "December - February",
      description: "Season of rest and rejuvenation",
      dosha: "Kapha predominant",
      practices: [
        "Vigorous exercise",
        "Sun bathing",
        "Warming yoga flows",
        "Dry brush massage",
        "Sauna and steam treatments",
      ],
      herbs: ["Ginger", "Turmeric", "Black pepper", "Cinnamon", "Cardamom", "Clove"],
      foods: ["Warm spices", "Light proteins", "Legumes", "Warming grains", "Stimulating vegetables", "Herbal teas"],
      dietTips:
        "Choose light, dry foods with warming spices. Increase movement and activity. Avoid heavy, oily meals and excess sleep.",
      benefits: "Increased metabolism, better energy levels, improved circulation",
    },
  ]

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-secondary/5 via-transparent to-accent/3">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <span className="text-sm font-medium text-primary">Seasonal Wellness</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Seasonal Herbs, Practices & Diet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Align your wellness routine with the seasons. Discover herbs, therapeutic practices, and personalized
            nutrition for optimal health throughout the year
          </p>
        </div>

        {/* Seasonal cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
          {seasons.map((season, idx) => {
            const Icon = season.icon
            return (
              <div
                key={idx}
                className={`group relative rounded-2xl border border-border/40 overflow-hidden bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
              >
                {/* Seasonal accent background */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-${season.color}/50 to-transparent pointer-events-none`}
                />

                <div className="relative p-8 space-y-6">
                  {/* Season header */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h3 className="text-2xl font-bold text-foreground">{season.name}</h3>
                      <p className={`text-sm font-medium text-${season.color}`}>{season.months}</p>
                      <p className="text-sm text-muted-foreground mt-2">{season.description}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-${season.color}/10 flex-shrink-0`}>
                      <Icon className={`w-7 h-7 text-${season.color}`} />
                    </div>
                  </div>

                  {/* Dosha info */}
                  <div className="space-y-2 pt-2 border-t border-border/30">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Dosha Constitution
                    </p>
                    <p className="text-sm text-foreground/80">{season.dosha}</p>
                  </div>

                  {/* Recommended practices */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Therapeutic Practices
                    </p>
                    <ul className="space-y-2">
                      {season.practices.slice(0, 3).map((practice, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                          <div className={`w-2 h-2 rounded-full bg-${season.color} mt-1.5 flex-shrink-0`} />
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended herbs */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Beneficial Herbs
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {season.herbs.map((herb, i) => (
                        <span
                          key={i}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${season.color}/10 text-${season.color} border border-${season.color}/20`}
                        >
                          {herb}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Recommended foods */}
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Seasonal Foods
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {season.foods.map((food, i) => (
                        <span
                          key={i}
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${season.color}/5 text-foreground border border-${season.color}/10`}
                        >
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Diet tips */}
                  <div className="pt-4 border-t border-border/30 space-y-3 bg-muted/30 rounded-lg p-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Dietary Guidelines
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">{season.dietTips}</p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Health Benefits
                    </p>
                    <p className="text-sm text-foreground/75 flex items-center gap-2">
                      <Zap size={14} className={`text-${season.color}`} />
                      {season.benefits}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Seasonal wellness tips CTA */}
        <div
          className={`mt-16 p-8 md:p-10 rounded-2xl border border-border/40 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 ${
            isVisible ? "animate-scale-in" : "opacity-0"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Follow Nature's Rhythm</h3>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Ayurveda teaches us to align our lifestyle with the seasons and natural rhythms. Each season brings
              different qualities that can either balance or aggravate our doshas. By adjusting your herbs, foods, and
              practices seasonally, you support your body's natural ability to maintain balance and prevent illness.
            </p>
            <div className="pt-2 space-y-2">
              <p className="text-sm font-medium text-foreground">Key Seasonal Principles:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Eat seasonal, locally-grown foods",
                  "Adjust your daily routine with seasons",
                  "Use appropriate warming or cooling practices",
                  "Include seasonal herbs for support",
                ].map((principle, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Leaf size={16} className="text-primary flex-shrink-0" />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
