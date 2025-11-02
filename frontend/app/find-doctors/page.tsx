import { PageLayout } from "@/components/layout/page-layout"
import { MapFinder } from "@/components/map-finder"

export default function FindDoctorsPage() {
  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 space-y-4">
            <div className="inline-block">
              <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                Find Nearby Doctors
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ayurvedic Doctors & Therapies Near You
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse certified Ayurvedic practitioners in your area, check their availability, and book free
              consultation slots instantly.
            </p>
          </div>

          {/* Map Finder */}
          <MapFinder />

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border/40">
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary">500+</div>
              <p className="text-muted-foreground">Verified Doctors</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary">4.8★</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <p className="text-muted-foreground">Successful Bookings</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
