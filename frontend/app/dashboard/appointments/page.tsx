

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, Video } from "lucide-react"

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      specialty: "General Wellness",
      date: "2025-01-15",
      time: "2:00 PM",
      type: "Video Consultation",
      status: "upcoming",
      fee: 60,
    },
    {
      id: 2,
      doctor: "Dr. Meera Patel",
      specialty: "Skin & Beauty",
      date: "2025-01-20",
      time: "10:30 AM",
      type: "Video Consultation",
      status: "upcoming",
      fee: 65,
    },
    {
      id: 3,
      doctor: "Dr. Amit Singh",
      specialty: "Digestive Health",
      date: "2024-12-20",
      time: "3:30 PM",
      type: "Video Consultation",
      status: "completed",
      fee: 70,
    },
  ]

  const upcomingAppointments = appointments.filter((a) => a.status === "upcoming")
  const completedAppointments = appointments.filter((a) => a.status === "completed")

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
            <p className="text-muted-foreground">Manage your consultations with Ayurvedic doctors</p>
          </div>
          <Link href="/doctors">
            <Button className="bg-primary hover:bg-primary/90">
              <Calendar size={18} className="mr-2" />
              Book New
            </Button>
          </Link>
        </div>

        {/* Upcoming Appointments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Upcoming</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="rounded-lg border border-border/40 bg-card p-8 text-center">
              <p className="text-muted-foreground">No upcoming appointments</p>
              <Link href="/doctors">
                <Button className="mt-4 bg-primary hover:bg-primary/90">Book an Appointment</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{apt.doctor}</h3>
                      <p className="text-sm text-primary font-medium">{apt.specialty}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                      {apt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Video size={16} className="text-muted-foreground" />
                      <span className="text-foreground">{apt.type}</span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">₹{apt.fee}</div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Join Consultation
                    </Button>
                    <Button size="sm" variant="outline">
                      Reschedule
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Completed Appointments */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Completed</h2>
          {completedAppointments.length === 0 ? (
            <div className="rounded-lg border border-border/40 bg-muted/30 p-8 text-center">
              <p className="text-muted-foreground">No completed appointments yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedAppointments.map((apt) => (
                <div key={apt.id} className="rounded-lg border border-border/40 bg-card p-6 opacity-75">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{apt.doctor}</h3>
                      <p className="text-sm text-muted-foreground">
                        {apt.date} at {apt.time}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground">
                      Completed
                    </span>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" variant="outline">
                      View Notes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
