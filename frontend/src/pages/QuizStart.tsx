import { QuizContainer } from "@/components/quiz/quiz-container"
import { PageLayout } from "@/components/layout/page-layout"

export default function QuizStart() {
  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <QuizContainer />
      </div>
    </PageLayout>
  )
}
