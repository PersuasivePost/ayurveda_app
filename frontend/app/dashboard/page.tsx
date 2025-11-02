

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Heart } from "lucide-react"

export default function DashboardPage() {
  // Mock user data
  const user = {
    name: "Priya Sharma",
    dosha: "Vata-Pitta",
    doshaPercentage: { vata: 45, pitta: 40, kapha: 15 },
  }

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Rajesh Kumar",
      date: "2025-01-15",
      time: "2:00 PM",
      specialty: "General Wellness",
    },
    {
      id: 2,
      doctor: "Dr. Meera Patel",
      date: "2025-01-20",
      time: "10:30 AM",
      specialty: "Skin & Beauty",
    },
  ]

  const healthMetrics = [
    { label: "Energy Level", value: 7, max: 10, emoji: "⚡" },
    { label: "Digestion", value: 6, max: 10, emoji: "🔄" },
    { label: "Sleep Quality", value: 8, max: 10, emoji: "😴" },
    { label: "Stress Level", value: 4, max: 10, emoji: "🧘" },
  ]

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Your personalized Ayurvedic wellness dashboard</p>
        </div>

        {/* Quick Stats - Dosha */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Your Constitution</h3>
            <p className="text-2xl font-bold text-primary">{user.dosha}</p>
            <div className="space-y-2">
              {Object.entries(user.doshaPercentage).map(([dosha, percentage]) => (
                <div key={dosha} className="flex items-center gap-3">
                  <span className="text-sm capitalize font-medium text-muted-foreground w-12">{dosha}:</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground w-8">{percentage}%</span>
                </div>
              ))}
            </div>
            <Link href="/dashboard/profile">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Full Profile
              </Button>
            </Link>
          </div>

          {/* Upcoming Appointment */}
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Next Appointment</h3>
              <Calendar size={20} className="text-primary" />
            </div>
            {upcomingAppointments[0] ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{upcomingAppointments[0].doctor}</p>
                <p className="font-semibold text-foreground">{upcomingAppointments[0].specialty}</p>
                <p className="text-sm text-primary">
                  {upcomingAppointments[0].date} at {upcomingAppointments[0].time}
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No appointments scheduled</p>
            )}
            <Link href="/dashboard/appointments">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Manage Appointments
              </Button>
            </Link>
          </div>

          {/* Wellness Score */}
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Wellness Score</h3>
              <Heart size={20} className="text-accent" />
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">7.5/10</p>
              <p className="text-sm text-muted-foreground">Good balance overall</p>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-3/4 bg-primary rounded-full" />
              </div>
            </div>
            <Link href="/dashboard/health">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                View Health Tracking
              </Button>
            </Link>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Today's Health Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {healthMetrics.map((metric, idx) => (
              <div key={idx} className="rounded-lg border border-border/40 bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  <span className="text-xl">{metric.emoji}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">of {metric.max}</p>
                </div>
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(metric.value / metric.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Dietary Adjustment",
                description: "Reduce cold foods and increase warming spices like ginger and black pepper",
                icon: "🍲",
              },
              {
                title: "Daily Routine",
                description: "Establish a consistent morning routine with oil massage and warm water",
                icon: "⏰",
              },
              {
                title: "Exercise",
                description: "Try gentle yoga or tai chi 4-5 times a week for better balance",
                icon: "🧘",
              },
              {
                title: "Meditation",
                description: "Practice 10 minutes of mindfulness meditation daily to calm the mind",
                icon: "🧠",
              },
            ].map((rec, idx) => (
              <div key={idx} className="rounded-lg border border-border/40 bg-card p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                  <span className="text-2xl">{rec.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/doctors">
            <Button className="w-full bg-primary hover:bg-primary/90">Book a Consultation</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full bg-transparent">
              Shop Products
            </Button>
          </Link>
          <Link href="/quiz">
            <Button variant="outline" className="w-full bg-transparent">
              Retake Quiz
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}
