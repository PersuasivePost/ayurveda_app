"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronRight, Leaf, Users, Package, Apple, Droplet, Flame, MapPin, Clock } from "lucide-react"
import { QuickRemedies } from "@/components/quick-remedies"
import { MapFinder } from "@/components/map-finder"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <PageLayout>
      <section className="w-full px-0 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center min-h-[600px] lg:min-h-[700px]">
            {/* Hero Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col justify-center">
              <div
                className={`space-y-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: "0.1s" }}
              >
                <div className="inline-block">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                    ✨ Welcome to Ayurvedic Wellness
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
                  Ancient <span className="text-primary">Wisdom</span> for Modern
                  <span className="block text-primary">Wellness</span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed text-pretty">
                  Connect with experienced Ayurvedic doctors, discover personalized treatments, and embrace holistic
                  healing aligned with your unique body constitution.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/quiz">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 btn-hover-lift w-full sm:w-auto gap-2">
                      Discover Your Body Type
                      <ChevronRight size={18} />
                    </Button>
                  </Link>
                  <Link href="/doctors">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto btn-hover-lift bg-transparent">
                      Find a Doctor
                    </Button>
                  </Link>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 pt-8 border-t border-border/30">
                  <div>
                    <p className="text-sm font-semibold text-foreground">500+</p>
                    <p className="text-sm text-muted-foreground">Expert Doctors</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">50K+</p>
                    <p className="text-sm text-muted-foreground">Happy Patients</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">4.9★</p>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              ref={heroRef}
              className={`relative h-[400px] lg:h-[700px] w-full ${isVisible ? "animate-fade-in-down" : "opacity-0"}`}
              style={{ animationDelay: "0.3s" }}
            >
              <div className="hero-image h-full w-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full group">
                  <img
                    src="/ayurvedic-wellness-meditation-spa-yoga-nature-retr.jpg"
                    alt="Ayurvedic Wellness"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-primary/3 to-transparent">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Premium Ayurvedic Care & Wellness
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience personalized healing guided by certified practitioners and centuries-old wisdom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Practitioners",
                description:
                  "Connect with certified Ayurvedic doctors with extensive clinical experience and proven expertise",
                icon: Users,
                color: "primary",
              },
              {
                title: "Personalized Plans",
                description:
                  "Customized wellness protocols tailored to your unique dosha constitution and health goals",
                icon: Leaf,
                color: "secondary",
              },
              {
                title: "Natural Products",
                description: "Authentic Ayurvedic herbs, supplements, and remedies sourced from trusted practitioners",
                icon: Package,
                color: "accent",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className={`feature-card p-8 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-transparent via-secondary/5 to-transparent">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-medium text-primary">Holistic Nutrition</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Personalized Ayurveda Diet for Your Dosha
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover customized nutrition plans designed for your unique body constitution to enhance vitality and
              bring balance to your system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                dosha: "Vata",
                element: "Air & Space",
                color: "secondary",
                icon: Droplet,
                description: "Grounding and warming foods",
                foods: ["Warm soups", "Whole grains", "Root vegetables", "Healthy oils", "Nuts & seeds"],
                qualities: "Warm, Heavy, Oily",
                tips: "Eat warm, cooked meals. Avoid cold, dry, or raw foods. Include warming spices.",
              },
              {
                dosha: "Pitta",
                element: "Fire & Water",
                color: "primary",
                icon: Flame,
                description: "Cooling and balancing foods",
                foods: ["Leafy greens", "Sweet fruits", "Cooling grains", "Coconut oil", "Fresh dairy"],
                qualities: "Cool, Light, Dry",
                tips: "Favor cooling foods. Avoid excessive heat, spicy foods, and acidic items.",
              },
              {
                dosha: "Kapha",
                element: "Earth & Water",
                color: "accent",
                icon: Apple,
                description: "Light and stimulating foods",
                foods: ["Legumes", "Bitter greens", "Light grains", "Warming spices", "Fresh vegetables"],
                qualities: "Light, Dry, Warm",
                tips: "Choose light, dry foods. Include stimulating spices. Avoid heavy and oily meals.",
              },
            ].map((dosha, idx) => {
              const Icon = dosha.icon
              return (
                <div
                  key={idx}
                  className={`group relative rounded-2xl border border-border/40 overflow-hidden bg-card/40 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.7 + idx * 0.1}s` }}
                >
                  {/* Background gradient accent */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-${dosha.color}/50 to-transparent pointer-events-none`}
                  />

                  <div className="relative p-8 space-y-6">
                    {/* Dosha header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-foreground">{dosha.dosha}</h3>
                        <p className={`text-sm font-medium text-${dosha.color}`}>{dosha.element}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-${dosha.color}/10`}>
                        <Icon className={`w-6 h-6 text-${dosha.color}`} />
                      </div>
                    </div>

                    {/* Main description */}
                    <p className="text-foreground font-medium">{dosha.description}</p>

                    {/* Qualities */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Key Qualities
                      </p>
                      <p className="text-sm text-foreground/80">{dosha.qualities}</p>
                    </div>

                    {/* Recommended foods */}
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Recommended Foods
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dosha.foods.map((food, i) => (
                          <span
                            key={i}
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-${dosha.color}/10 text-${dosha.color} border border-${dosha.color}/20`}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div className="pt-4 border-t border-border/30 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Dietary Tips
                      </p>
                      <p className="text-sm text-foreground/75 leading-relaxed">{dosha.tips}</p>
                    </div>

                    {/* Learn more link */}
                    <div className="pt-2">
                      <Link
                        href="/quiz"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group/link"
                      >
                        Learn More{" "}
                        <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Diet customization CTA */}
          <div
            className={`mt-12 p-8 md:p-10 rounded-xl bg-gradient-to-r from-secondary/10 to-accent/10 border border-border/40 ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "1s" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-foreground">Get Your Personalized Diet Plan</h3>
                <p className="text-muted-foreground">
                  Take our dosha quiz and receive a customized meal plan aligned with your body constitution and
                  seasonal adjustments.
                </p>
              </div>
              <Link href="/quiz" className="flex-shrink-0">
                <Button size="lg" className="bg-primary hover:bg-primary/90 btn-hover-lift whitespace-nowrap gap-2">
                  Start Diet Quiz
                  <ChevronRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuickRemedies />

      {/* Learn Ayurveda CTA card */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-transparent via-primary/3 to-secondary/5">
        <div className="mx-auto max-w-4xl">
          <div
            className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 p-12 md:p-16 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.9s" }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
            </div>

            <Link href="/learn-ayurveda" className="relative block space-y-6">
              <div className="flex items-start justify-between">
                <div className="space-y-4 flex-1">
                  <div className="inline-block">
                    <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                      Complete Learning Hub
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                    Learn Ayurveda: Complete Guide
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Explore seasonal wisdom, dosha characteristics, therapeutic practices, and personalized diet
                    recommendations based on your body constitution and the changing seasons.
                  </p>

                  <div className="pt-6">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 btn-hover-lift group/btn gap-2">
                      Explore Ayurveda
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                <div className="hidden md:flex flex-shrink-0 ml-8">
                  <div className="text-6xl">🌿</div>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-border/30">
                {[
                  { label: "4 Seasons", value: "Complete Guides" },
                  { label: "3 Doshas", value: "In-Depth Info" },
                  { label: "5 Practices", value: "Therapeutic" },
                  { label: "Recipes", value: "Seasonal Foods" },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm text-foreground/80">{item.value}</p>
                  </div>
                ))}
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Map-based doctor finder section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-20 md:py-28 bg-gradient-to-b from-accent/5 via-transparent to-secondary/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <span className="text-sm font-medium text-primary">Find & Book Easily</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Discover Ayurvedic Doctors & Therapies Near You
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Locate certified Ayurvedic practitioners, view their expertise and availability, and book free
              consultation slots directly
            </p>
          </div>

          <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1.2s" }}>
            <MapFinder />
          </div>

          {/* Benefits below map finder */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                title: "Find Doctors Near You",
                description: "Search by location and find certified Ayurvedic practitioners in your area",
                icon: MapPin,
              },
              {
                title: "Check Availability",
                description: "View free consultation slots and book appointments that fit your schedule",
                icon: Clock,
              },
              {
                title: "Easy Booking",
                description: "One-click booking with integrated payment and appointment confirmation",
                icon: Package,
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm text-center space-y-3 hover:bg-card transition-all duration-300 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${1.4 + idx * 0.1}s` }}
                >
                  <div className="flex justify-center">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon size={24} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 mb-8">
        <div className="mx-auto max-w-4xl">
          <div
            className={`relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-primary via-primary/95 to-accent/80 text-primary-foreground overflow-hidden ${
              isVisible ? "animate-scale-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative space-y-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">Transform Your Health Today</h2>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Take our comprehensive body type quiz to understand your unique constitution and receive a personalized
                wellness roadmap from Ayurvedic experts.
              </p>
              <div className="pt-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 btn-hover-lift"
                  >
                    Start Your Journey
                    <ChevronRight size={18} />
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
