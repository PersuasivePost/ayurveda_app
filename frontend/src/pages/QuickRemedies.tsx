import { PageLayout } from "@/components/layout/page-layout"
import { QuickRemedies as QuickRemediesComponent } from "@/components/quick-remedies"

export default function QuickRemedies() {
  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Quick Ayurvedic Remedies</h1>
            <p className="text-lg text-muted-foreground">
              Natural solutions for common health concerns
            </p>
          </div>
          
          <QuickRemediesComponent />
        </div>
      </div>
    </PageLayout>
  )
}
