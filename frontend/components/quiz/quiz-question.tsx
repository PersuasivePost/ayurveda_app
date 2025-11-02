

import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz"

interface QuizQuestionProps {
  question: QuizQuestionType
  selectedAnswer?: number
  onSelectAnswer: (optionIndex: number) => void
}

export function QuizQuestion({ question, selectedAnswer, onSelectAnswer }: QuizQuestionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-4 rounded-lg border-2 text-left transition ${
              selectedAnswer === index
                ? "border-primary bg-primary/10"
                : "border-border/40 bg-card hover:border-border/60"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                  selectedAnswer === index ? "border-primary bg-primary" : "border-border/40"
                }`}
              >
                {selectedAnswer === index && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
              <span className="text-foreground font-medium">{option.text}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
