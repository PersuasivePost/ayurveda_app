"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronRight, Search } from "lucide-react"

const remediesData = [
  {
    id: 1,
    name: "Headache",
    icon: "🤕",
    category: "Pain Relief",
    remedies: [
      {
        title: "Sesame Oil Head Massage",
        description: "Apply warm sesame oil to temples and scalp with gentle massage strokes for 5-10 minutes",
        duration: "10 mins",
        frequency: "3x weekly",
        bestFor: "Vata & Kapha",
      },
      {
        title: "Ginger Tea",
        description: "Steep fresh ginger slices in hot water with honey and lemon for instant relief",
        duration: "5 mins",
        frequency: "As needed",
        bestFor: "All doshas",
      },
      {
        title: "Cool Coconut Oil Compress",
        description: "Apply cool coconut oil on forehead and temples to reduce heat and inflammation",
        duration: "15 mins",
        frequency: "2x daily",
        bestFor: "Pitta",
      },
    ],
  },
  {
    id: 2,
    name: "Acne & Pimples",
    icon: "🧴",
    category: "Skin Care",
    remedies: [
      {
        title: "Turmeric Face Mask",
        description: "Mix turmeric powder with honey and yogurt, apply for 15-20 minutes then rinse",
        duration: "20 mins",
        frequency: "2-3x weekly",
        bestFor: "Pitta aggravation",
      },
      {
        title: "Neem Paste",
        description: "Crush fresh neem leaves with water to form a paste and apply on affected areas",
        duration: "15 mins",
        frequency: "Daily",
        bestFor: "All doshas",
      },
      {
        title: "Aloe Vera Gel",
        description: "Apply fresh aloe vera gel directly on acne spots for cooling and healing effect",
        duration: "Overnight",
        frequency: "Daily",
        bestFor: "Pitta excess",
      },
    ],
  },
  {
    id: 3,
    name: "Hair Fall",
    icon: "💇",
    category: "Hair Care",
    remedies: [
      {
        title: "Bhringraj Oil Massage",
        description: "Warm bhringraj oil and massage scalp for 15-20 minutes, leave for 1-2 hours",
        duration: "20 mins",
        frequency: "2x weekly",
        bestFor: "Pitta excess",
      },
      {
        title: "Brahmi Oil Treatment",
        description: "Apply brahmi infused oil to strengthen hair roots and promote growth",
        duration: "30 mins",
        frequency: "Weekly",
        bestFor: "Vata imbalance",
      },
      {
        title: "Coconut & Hibiscus Paste",
        description: "Mix coconut oil with hibiscus flowers and apply as a nourishing hair mask",
        duration: "45 mins",
        frequency: "2x monthly",
        bestFor: "All doshas",
      },
    ],
  },
  {
    id: 4,
    name: "Digestion Issues",
    icon: "🫖",
    category: "Digestive Health",
    remedies: [
      {
        title: "Ginger-Cumin Water",
        description: "Boil ginger and cumin in water, sip before meals to improve digestion",
        duration: "5 mins",
        frequency: "Before meals",
        bestFor: "All doshas",
      },
      {
        title: "Triphala Powder",
        description: "Mix triphala powder with warm water, take 30 minutes before bedtime",
        duration: "5 mins",
        frequency: "Daily",
        bestFor: "Detoxification",
      },
      {
        title: "Fennel Seed Tea",
        description: "Steep fennel seeds in hot water and sip slowly for soothing digestion",
        duration: "10 mins",
        frequency: "After meals",
        bestFor: "Bloating relief",
      },
    ],
  },
  {
    id: 5,
    name: "Insomnia & Sleep Issues",
    icon: "😴",
    category: "Sleep & Relaxation",
    remedies: [
      {
        title: "Warm Milk with Ashwagandha",
        description: "Mix ashwagandha powder in warm milk with honey and drink 1 hour before bed",
        duration: "5 mins",
        frequency: "Daily",
        bestFor: "Vata imbalance",
      },
      {
        title: "Oil Massage (Abhyanga)",
        description: "Apply warm sesame oil to entire body with gentle strokes before bedtime",
        duration: "20 mins",
        frequency: "4-5x weekly",
        bestFor: "All doshas",
      },
      {
        title: "Brahmi Tea",
        description: "Brew brahmi leaves in hot water with chamomile for calming effect",
        duration: "10 mins",
        frequency: "Evening",
        bestFor: "Pitta excess",
      },
    ],
  },
  {
    id: 6,
    name: "Joint Pain & Inflammation",
    icon: "🦵",
    category: "Pain Relief",
    remedies: [
      {
        title: "Sesame Oil Heat Therapy",
        description: "Warm sesame oil and massage affected joints, apply heating pad for 15-20 mins",
        duration: "25 mins",
        frequency: "Daily",
        bestFor: "Vata imbalance",
      },
      {
        title: "Turmeric Paste",
        description: "Mix turmeric with mustard oil and apply as warm compress on joints",
        duration: "20 mins",
        frequency: "2x daily",
        bestFor: "Inflammation",
      },
      {
        title: "Ginger & Lemongrass Tea",
        description: "Boil ginger and lemongrass for anti-inflammatory herbal tea",
        duration: "10 mins",
        frequency: "Twice daily",
        bestFor: "All doshas",
      },
    ],
  },
]

export default function QuickRemediesPage() {
  const [selectedRemedy, setSelectedRemedy] = useState(remediesData[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const pageRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredRemedies = remediesData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="mx-auto max-w-7xl text-center space-y-6">
          <div
            className={`inline-block ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
              ✨ Instant Relief
            </span>
          </div>

          <h1
            className={`text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Quick Ayurvedic <span className="text-primary">Remedies</span> for Common Ailments
          </h1>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            Discover instant, natural Ayurvedic solutions for everyday health issues. Quick, effective, and backed by
            ancient wisdom.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border/40">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search by symptoms (headache, acne, hair fall...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border/40 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Symptoms List */}
            <div
              className={`lg:col-span-1 ${isVisible ? "animate-fade-in-left" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              <div className="space-y-3 sticky top-32">
                {filteredRemedies.map((remedy) => (
                  <button
                    key={remedy.id}
                    onClick={() => setSelectedRemedy(remedy)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRemedy.id === remedy.id
                        ? "border-primary bg-primary/10"
                        : "border-border/40 bg-card/50 hover:bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{remedy.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{remedy.name}</p>
                        <p className="text-xs text-muted-foreground">{remedy.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Remedies Display */}
            <div
              className={`lg:col-span-2 ${isVisible ? "animate-fade-in-right" : "opacity-0"}`}
              style={{ animationDelay: "0.5s" }}
            >
              {filteredRemedies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No remedies found. Try a different search.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Selected Remedy Header */}
                  <div className="space-y-3 pb-6 border-b border-border/30">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{selectedRemedy.icon}</span>
                      <div>
                        <h2 className="text-4xl font-bold text-foreground">{selectedRemedy.name}</h2>
                        <p className="text-muted-foreground">{selectedRemedy.category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Remedies List */}
                  <div className="space-y-4">
                    {selectedRemedy.remedies.map((remedy, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg group"
                      >
                        <div className="space-y-4">
                          {/* Title */}
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {remedy.title}
                          </h3>

                          {/* Description */}
                          <p className="text-muted-foreground leading-relaxed">{remedy.description}</p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/20">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Duration
                              </p>
                              <p className="text-sm font-medium text-foreground mt-1">{remedy.duration}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Frequency
                              </p>
                              <p className="text-sm font-medium text-foreground mt-1">{remedy.frequency}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Best For
                              </p>
                              <p className="text-sm font-medium text-primary mt-1">{remedy.bestFor}</p>
                            </div>
                          </div>

                          {/* CTA */}
                          <div className="pt-2">
                            <Link href="/doctors">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-primary border-primary/30 hover:bg-primary/10 gap-2 bg-transparent"
                              >
                                Consult a Doctor <ChevronRight size={14} />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-gradient-to-b from-primary/3 to-transparent">
        <div className="mx-auto max-w-4xl">
          <div
            className={`relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-accent/80 text-primary-foreground overflow-hidden ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.7s" }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative space-y-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Need Professional Guidance?</h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                While these quick remedies provide relief, consulting with an Ayurvedic doctor ensures a personalized
                treatment plan tailored to your unique constitution.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/doctors">
                  <Button
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-hover-lift"
                  >
                    Find a Doctor
                    <ChevronRight size={18} />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    Take Dosha Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
