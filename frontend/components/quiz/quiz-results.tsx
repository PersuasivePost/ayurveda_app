"use client"

import { type QuizResult, DOSHA_INFO } from "@/lib/quiz"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface QuizResultsProps {
  result: QuizResult
  onRestart: () => void
}

export function QuizResults({ result, onRestart }: QuizResultsProps) {
  const primaryInfo = DOSHA_INFO[result.primaryDosha]
  const secondaryInfo = DOSHA_INFO[result.secondaryDosha]

  return (
    <div className="w-full space-y-8">
      {/* Results Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Your Ayurvedic Constitution</h2>
        <p className="text-lg text-muted-foreground">Based on your answers, here's your unique wellness profile</p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(["vata", "pitta", "kapha"] as const).map((dosha) => (
          <div key={dosha} className={`p-6 rounded-lg text-white space-y-4 ${DOSHA_INFO[dosha].color}`}>
            <div className="text-3xl font-bold">{result.percentages[dosha]}%</div>
            <h3 className="text-xl font-semibold">{DOSHA_INFO[dosha].name}</h3>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${result.percentages[dosha]}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Primary Dosha Detail */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Primary: {primaryInfo.name} Constitution</h3>
          <p className="text-muted-foreground mb-4">{primaryInfo.description}</p>
          <p className="text-muted-foreground text-sm mb-4">
            Dosha Element: <span className="font-semibold">{primaryInfo.element}</span>
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3">Typical Traits</h4>
          <ul className="space-y-2">
            {primaryInfo.traits.map((trait, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${primaryInfo.color}`} />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Secondary Dosha */}
      {result.secondaryDosha !== result.primaryDosha && (
        <div className="p-6 rounded-lg border border-border/40 bg-muted/30 space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Secondary: {secondaryInfo.name} Influence</h4>
            <p className="text-sm text-muted-foreground">
              Your secondary constitution provides additional balance and characteristics that complement your primary
              dosha.
            </p>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-6 p-6 rounded-lg border border-border/40 bg-card">
        <h3 className="text-xl font-bold text-foreground">Personalized Recommendations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Dietary Guidance</h4>
            <p className="text-sm text-muted-foreground">{primaryInfo.recommendations.diet}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Lifestyle</h4>
            <p className="text-sm text-muted-foreground">{primaryInfo.recommendations.lifestyle}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Exercise</h4>
            <p className="text-sm text-muted-foreground">{primaryInfo.recommendations.exercise}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Recommended Herbs</h4>
            <p className="text-sm text-muted-foreground">{primaryInfo.recommendations.herbs}</p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard" className="flex-1">
          <Button className="w-full bg-primary hover:bg-primary/90">View Your Wellness Plan</Button>
        </Link>
        <Link href="/doctors" className="flex-1">
          <Button variant="outline" className="w-full bg-transparent">
            Consult a Specialist
          </Button>
        </Link>
        <button onClick={onRestart} className="flex-1">
          <Button variant="ghost" className="w-full">
            Retake Quiz
          </Button>
        </button>
      </div>
    </div>
  )
}
