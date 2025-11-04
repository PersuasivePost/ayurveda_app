

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface QuizResultsProps {
  result: {
    dosha: string
    scores: {
      vata: number
      pitta: number
      kapha: number
    }
    recommendations: {
      description: string
      diet: string
      lifestyle: string
      tips: string[]
    }
  }
  onRestart: () => void
  onViewProfile?: () => void
}

const DOSHA_COLORS: Record<string, string> = {
  Vata: 'bg-purple-500',
  Pitta: 'bg-orange-500',
  Kapha: 'bg-green-500',
}

const DOSHA_ELEMENTS: Record<string, string> = {
  Vata: 'Air + Space',
  Pitta: 'Fire + Water',
  Kapha: 'Earth + Water',
}

export function QuizResults({ result, onRestart, onViewProfile }: QuizResultsProps) {
  const { dosha, scores, recommendations } = result
  
  // Calculate percentages
  const total = scores.vata + scores.pitta + scores.kapha
  const percentages = {
    vata: total > 0 ? Math.round((scores.vata / total) * 100) : 0,
    pitta: total > 0 ? Math.round((scores.pitta / total) * 100) : 0,
    kapha: total > 0 ? Math.round((scores.kapha / total) * 100) : 0,
  }

  // Determine primary dosha
  const primaryDosha = dosha.split('-')[0]
  const doshaColor = DOSHA_COLORS[primaryDosha] || 'bg-primary'
  const doshaElement = DOSHA_ELEMENTS[primaryDosha] || ''

  return (
    <div className="w-full space-y-8">
      {/* Results Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Your Ayurvedic Constitution</h2>
        <p className="text-lg text-muted-foreground">Based on your answers, here's your unique wellness profile</p>
        <div className={`inline-block px-6 py-3 rounded-full text-white text-2xl font-bold ${doshaColor}`}>
          {dosha}
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg bg-purple-500 text-white space-y-4">
          <div className="text-3xl font-bold">{percentages.vata}%</div>
          <h3 className="text-xl font-semibold">Vata</h3>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${percentages.vata}%` }} />
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-orange-500 text-white space-y-4">
          <div className="text-3xl font-bold">{percentages.pitta}%</div>
          <h3 className="text-xl font-semibold">Pitta</h3>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${percentages.pitta}%` }} />
          </div>
        </div>
        
        <div className="p-6 rounded-lg bg-green-500 text-white space-y-4">
          <div className="text-3xl font-bold">{percentages.kapha}%</div>
          <h3 className="text-xl font-semibold">Kapha</h3>
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white" style={{ width: `${percentages.kapha}%` }} />
          </div>
        </div>
      </div>

      {/* Primary Dosha Detail */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{dosha} Constitution</h3>
          <p className="text-muted-foreground mb-4">{recommendations.description}</p>
          {doshaElement && (
            <p className="text-muted-foreground text-sm mb-4">
              Dosha Element: <span className="font-semibold">{doshaElement}</span>
            </p>
          )}
        </div>

        {recommendations.tips && recommendations.tips.length > 0 && (
          <div>
            <h4 className="font-semibold text-foreground mb-3">Key Tips</h4>
            <ul className="space-y-2">
              {recommendations.tips.map((tip, idx) => (
                <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full ${doshaColor}`} />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="space-y-6 p-6 rounded-lg border border-border/40 bg-card">
        <h3 className="text-xl font-bold text-foreground">Personalized Recommendations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Dietary Guidance</h4>
            <p className="text-sm text-muted-foreground">{recommendations.diet}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm">Lifestyle</h4>
            <p className="text-sm text-muted-foreground">{recommendations.lifestyle}</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
        Your dosha result has been saved to your profile!
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4">
        {onViewProfile && (
          <button onClick={onViewProfile} className="flex-1">
            <Button className="w-full bg-primary hover:bg-primary/90">View Profile</Button>
          </button>
        )}
        <Link to="/doctors" className="flex-1">
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
