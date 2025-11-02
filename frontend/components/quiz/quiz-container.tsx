

import { useState } from "react"
import { QUIZ_QUESTIONS, calculateResult, type QuizResult } from "@/lib/quiz"
import { QuizQuestion } from "@/components/quiz/quiz-question"
import { QuizResults } from "@/components/quiz/quiz-results"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function QuizContainer() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = optionIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      const quizResult = calculateResult(answers)
      setResult(quizResult)
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setIsCompleted(false)
    setResult(null)
  }

  if (isCompleted && result) {
    return <QuizResults result={result} onRestart={handleRestart} />
  }

  const question = QUIZ_QUESTIONS[currentQuestion]
  const selectedAnswer = answers[currentQuestion]
  const isAnswered = selectedAnswer !== undefined
  const progressPercent = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </p>
          <p className="text-foreground font-medium">{Math.round(progressPercent)}%</p>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <QuizQuestion question={question} selectedAnswer={selectedAnswer} onSelectAnswer={handleSelectAnswer} />

      {/* Navigation */}
      <div className="flex gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          className="flex-1 bg-transparent"
        >
          <ChevronLeft size={18} className="mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isAnswered} className="flex-1 bg-primary hover:bg-primary/90">
          {currentQuestion === QUIZ_QUESTIONS.length - 1 ? (
            <>
              View Results
              <ChevronRight size={18} className="ml-2" />
            </>
          ) : (
            <>
              Next
              <ChevronRight size={18} className="ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
