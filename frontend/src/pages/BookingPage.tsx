import { useParams } from "react-router-dom"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"

export default function BookingPage() {
  const { doctorId } = useParams<{ doctorId: string }>()

  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-lg text-muted-foreground">
              Schedule your consultation (Doctor ID: {doctorId})
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Date</label>
                <input type="date" className="w-full mt-1 px-3 py-2 border border-border rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium">Select Time</label>
                <select className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Reason for Visit</label>
                <textarea 
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                  rows={4}
                  placeholder="Describe your health concerns..."
                />
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
