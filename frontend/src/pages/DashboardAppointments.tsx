import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DashboardAppointments() {
  const appointments = [
    { id: "1", doctor: "Dr. Priya Sharma", date: "Nov 15, 2025", time: "10:00 AM", status: "Confirmed" },
    { id: "2", doctor: "Dr. Arjun Verma", date: "Nov 20, 2025", time: "2:00 PM", status: "Pending" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled consultations</p>
        </div>
        
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{apt.doctor}</h3>
                  <p className="text-sm text-muted-foreground">{apt.date} at {apt.time}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {apt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
