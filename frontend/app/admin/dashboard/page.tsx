

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Activity, DollarSign, AlertCircle } from "lucide-react"

const revenueData = [
  { month: "Jan", revenue: 12000, consultations: 45 },
  { month: "Feb", revenue: 19000, consultations: 62 },
  { month: "Mar", revenue: 15000, consultations: 48 },
  { month: "Apr", revenue: 22000, consultations: 71 },
  { month: "May", revenue: 28000, consultations: 89 },
]

const userDistribution = [
  { name: "Patients", value: 2847, color: "#6B4423" },
  { name: "Doctors", value: 124, color: "#C5A572" },
  { name: "Admins", value: 8, color: "#A67C52" },
]

export default function AdminDashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform analytics and management</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <Users size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">2,979</p>
            <p className="text-xs text-primary">+12% from last month</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
              <DollarSign size={20} className="text-secondary" />
            </div>
            <p className="text-3xl font-bold text-foreground">₹2,86,000</p>
            <p className="text-xs text-secondary">+23% from last month</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
              <Activity size={20} className="text-accent" />
            </div>
            <p className="text-3xl font-bold text-foreground">142</p>
            <p className="text-xs text-accent">8 pending approvals</p>
          </div>

          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Avg Satisfaction</p>
              <TrendingUp size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">4.7/5</p>
            <p className="text-xs text-muted-foreground">Based on 1,247 reviews</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">Revenue & Consultations</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="consultations" stroke="var(--color-secondary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* User Distribution */}
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h2 className="text-lg font-bold text-foreground">User Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-sm">
              {userDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertCircle size={20} className="text-secondary" />
              System Alerts & Issues
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { level: "warning", message: "5 pending doctor verifications" },
              { level: "info", message: "Database backup completed successfully" },
              { level: "warning", message: "2 reported user disputes requiring review" },
            ].map((alert, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.level === "warning"
                    ? "bg-secondary/10 border border-secondary/20"
                    : "bg-primary/10 border border-primary/20"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    alert.level === "warning" ? "bg-secondary" : "bg-primary"
                  }`}
                />
                <p className="text-sm text-muted-foreground">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">User Management</h3>
            <p className="text-sm text-muted-foreground">Manage users, roles, and permissions</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Users
            </Button>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Content Management</h3>
            <p className="text-sm text-muted-foreground">Manage products, articles, and resources</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Content
            </Button>
          </div>
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Platform Settings</h3>
            <p className="text-sm text-muted-foreground">Configure system settings and policies</p>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Go to Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
