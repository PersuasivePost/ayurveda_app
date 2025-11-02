import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function About() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Ayurvedic Wellness</h1>
          <p className="text-lg text-muted-foreground">
            We bridge ancient Ayurvedic wisdom with modern technology to deliver personalized, evidence-based healing to
            everyone.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make authentic Ayurvedic healing accessible to everyone by connecting patients with expert
                practitioners and providing scientifically-backed natural wellness solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe true health comes from understanding your unique constitution and living in harmony with
                nature's principles.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A world where preventive, personalized healthcare based on Ayurvedic principles is the standard, not the
                exception.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We envision a global community that embraces holistic wellness, emotional balance, and sustainable
                living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Authenticity", desc: "We uphold true Ayurvedic principles" },
              { title: "Excellence", desc: "Expert practitioners & quality products" },
              { title: "Accessibility", desc: "Wellness for everyone, everywhere" },
              { title: "Integrity", desc: "Transparent, ethical practices" },
            ].map((val, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-border/40 bg-card">
                <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">Meet Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Dr. Priya Sharma", role: "Founder & CEO", bio: "20+ years in Ayurvedic medicine" },
              { name: "Dr. Arjun Verma", role: "Chief Medical Officer", bio: "Board-certified Ayurvedic physician" },
              { name: "Sarah Chen", role: "Head of Operations", bio: "Healthcare technology expert" },
            ].map((member, idx) => (
              <div key={idx} className="p-6 rounded-lg border border-border/40 bg-card text-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center text-3xl">
                  👤
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24 bg-primary/10 rounded-lg mx-4 sm:mx-6 lg:mx-8 mb-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Ready to Experience Ayurvedic Wellness?</h2>
          <p className="text-lg text-muted-foreground">
            Start with our body type quiz to find your unique wellness path.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Take the Quiz
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
