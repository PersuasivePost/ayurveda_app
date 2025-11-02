import { PageLayout } from "@/components/layout/page-layout"
import { QuizContainer } from "@/components/quiz/quiz-container"

export default function QuizStartPage() {
  return (
    <PageLayout>
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="mx-auto max-w-4xl">
          <QuizContainer />
        </div>
      </section>
    </PageLayout>
  )
}
