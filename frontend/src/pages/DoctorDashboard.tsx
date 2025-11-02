import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DoctorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Manage your practice and patients</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Today's Appointments", value: "8", icon: "📅" },
            { title: "Total Patients", value: "156", icon: "👥" },
            { title: "Pending Reviews", value: "12", icon: "📝" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-lg p-6 space-y-2">
              <div className="text-3xl">{stat.icon}</div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
