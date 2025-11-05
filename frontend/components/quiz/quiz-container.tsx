

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { QuizResults } from "@/components/quiz/quiz-results"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { doshaService, type DoshaQuestion, type DoshaAnswer } from "@/services/dosha.service"

export function QuizContainer() {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<DoshaQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Map<number, string>>(new Map())
  const [isCompleted, setIsCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  // Fetch questions from backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const response = await doshaService.getQuestions()
        setQuestions(response.questions)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quiz questions")
        console.error("Error fetching questions:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleSelectAnswer = (optionText: string) => {
    const newAnswers = new Map(answers)
    newAnswers.set(currentQuestion, optionText)
    setAnswers(newAnswers)
  }

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed - submit to backend
      await submitQuiz()
    }
  }

  const submitQuiz = async () => {
    try {
      setSubmitting(true)
      setError(null)
      
      // Convert answers Map to array format expected by backend
      const answersArray: DoshaAnswer[] = []
      answers.forEach((answer, index) => {
        answersArray.push({
          questionId: questions[index].id,
          answer: answer
        })
      })
      
      const quizResult = await doshaService.submitQuiz(answersArray)
      setResult(quizResult)
      setIsCompleted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit quiz")
      console.error("Error submitting quiz:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers(new Map())
    setIsCompleted(false)
    setResult(null)
  }

  const handleViewProfile = () => {
    navigate('/dashboard/profile')
  }

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading quiz questions...</p>
      </div>
    )
  }

  if (error && questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (isCompleted && result) {
    return (
      <QuizResults 
        result={{
          dosha: result.result,
          scores: result.scores,
          recommendations: result.recommendations
        }} 
        onRestart={handleRestart}
        onViewProfile={handleViewProfile}
      />
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers.get(currentQuestion)
  const isAnswered = selectedAnswer !== undefined
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <p className="text-foreground font-medium">{Math.round(progressPercent)}%</p>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{question.question}</h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(option.text)}
              className={`w-full p-4 rounded-lg border-2 text-left transition ${
                selectedAnswer === option.text
                  ? "border-primary bg-primary/10"
                  : "border-border/40 bg-card hover:border-border/60"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                    selectedAnswer === option.text ? "border-primary bg-primary" : "border-border/40"
                  }`}
                >
                  {selectedAnswer === option.text && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                </div>
                <span className="text-foreground font-medium">{option.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

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
        <Button 
          onClick={handleNext} 
          disabled={!isAnswered || submitting} 
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {currentQuestion === questions.length - 1 ? (
            <>
              {submitting ? "Submitting..." : "View Results"}
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
