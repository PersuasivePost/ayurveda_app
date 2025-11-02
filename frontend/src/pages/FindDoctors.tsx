import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function FindDoctors() {
  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Find Ayurvedic Doctors Near You</h1>
            <p className="text-lg text-muted-foreground">
              Search and connect with certified Ayurvedic practitioners in your area
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8">
            <p className="text-center text-muted-foreground">Map and search functionality coming soon...</p>
          </div>
          
          <div className="text-center">
            <Link to="/doctors">
              <Button size="lg">Browse All Doctors</Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
