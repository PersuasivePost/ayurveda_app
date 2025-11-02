import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to your wellness dashboard</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Upcoming Appointments", value: "3", icon: "📅" },
            { title: "Health Score", value: "85%", icon: "💚" },
            { title: "Active Programs", value: "2", icon: "📋" },
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
