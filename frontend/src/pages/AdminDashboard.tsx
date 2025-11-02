import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Users", value: "1,234", icon: "👥" },
            { title: "Active Doctors", value: "45", icon: "👨‍⚕️" },
            { title: "Appointments", value: "567", icon: "📅" },
            { title: "Revenue", value: "$12.5k", icon: "💰" },
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
