"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Clock, Star } from "lucide-react"

export default function DoctorDashboardPage() {
  const doctorStats = {
    name: "Dr. Rajesh Kumar",
    specialty: "General Wellness",
    rating: 4.9,
    reviews: 128,
    consultationsToday: 3,
    totalPatients: 247,
    avgResponseTime: "15 minutes",
  }

  const todayAppointments = [
    {
      id: 1,
      patientName: "Priya Sharma",
      time: "10:00 AM",
      duration: "30 min",
      dosha: "Vata-Pitta",
      reason: "General wellness checkup",
      status: "confirmed",
    },
    {
      id: 2,
      patientName: "Amit Patel",
      time: "11:00 AM",
      duration: "30 min",
      dosha: "Kapha",
      reason: "Digestive issues",
      status: "confirmed",
    },
    {
      id: 3,
      patientName: "Sarah Johnson",
      time: "2:00 PM",
      duration: "30 min",
      dosha: "Pitta",
      reason: "Skin consultation",
      status: "pending",
    },
  ]

  const recentMessages = [
    { id: 1, patient: "Priya Sharma", message: "Thank you for the recommendations!", time: "1 hour ago" },
    { id: 2, patient: "Amit Patel", message: "When can I schedule another appointment?", time: "2 hours ago" },
  ]

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Welcome, {doctorStats.name}</h1>
          <p className="text-muted-foreground">
            {doctorStats.specialty} | Rating: {doctorStats.rating} ({doctorStats.reviews} reviews)
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Today's Consultations</p>
              <Calendar size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{doctorStats.consultationsToday}</p>
            <p className="text-xs text-muted-foreground">Active consultations</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Patients</p>
              <Users size={20} className="text-secondary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{doctorStats.totalPatients}</p>
            <p className="text-xs text-muted-foreground">Active patients</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
              <Clock size={20} className="text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">{doctorStats.avgResponseTime}</p>
            <p className="text-xs text-muted-foreground">To patient inquiries</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Rating</p>
              <Star size={20} className="text-primary fill-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{doctorStats.rating}</p>
            <p className="text-xs text-muted-foreground">Based on {doctorStats.reviews} reviews</p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Today's Schedule</h2>
            <Button variant="outline" size="sm">
              Manage Schedule
            </Button>
          </div>

          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="rounded-lg border border-border/40 bg-card p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{apt.patientName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {apt.time} • {apt.duration}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      apt.status === "confirmed" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Dosha:</span> {apt.dosha}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Reason:</span> {apt.reason}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Start Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Recent Messages</h2>
            <div className="space-y-3">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="rounded-lg border border-border/40 bg-card p-4">
                  <p className="font-medium text-foreground">{msg.patient}</p>
                  <p className="text-sm text-muted-foreground mt-1">{msg.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              View All Messages
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">This Week</h2>
            <div className="space-y-4">
              {[
                { label: "Consultations", value: 18, change: "+2 from last week" },
                { label: "Patient Satisfaction", value: "94%", change: "+3% from last week" },
                { label: "Average Session Time", value: "32 min", change: "Stable" },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-lg border border-border/40 bg-card p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-primary mt-1">{stat.change}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
