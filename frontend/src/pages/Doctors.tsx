import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Doctors() {
  const doctors = [
    { id: "1", name: "Dr. Priya Sharma", specialty: "Panchakarma", experience: "15 years", rating: 4.9 },
    { id: "2", name: "Dr. Arjun Verma", specialty: "General Wellness", experience: "12 years", rating: 4.8 },
    { id: "3", name: "Dr. Anjali Patel", specialty: "Skin & Hair", experience: "10 years", rating: 4.7 },
  ]

  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Expert Doctors</h1>
            <p className="text-lg text-muted-foreground">
              Certified Ayurvedic practitioners ready to guide your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-card border border-border rounded-lg p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto flex items-center justify-center text-3xl">
                  👨‍⚕️
                </div>
                <h3 className="text-xl font-semibold text-foreground text-center">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground text-center">{doctor.specialty}</p>
                <p className="text-xs text-muted-foreground text-center">{doctor.experience} • ⭐ {doctor.rating}</p>
                <Link to={`/booking/${doctor.id}`}>
                  <Button className="w-full">Book Appointment</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
