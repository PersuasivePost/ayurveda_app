import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Link } from "react-router-dom"
import { Package, Users, Stethoscope, Calendar, ShoppingCart, Settings, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { adminService, type AdminDashboardData } from "@/services/admin.service"

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const data = await adminService.getDashboardStats()
        setDashboardData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data")
        console.error("Error fetching dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (seconds < 60) return `${seconds} seconds ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    const days = Math.floor(hours / 24)
    return `${days} day${days > 1 ? 's' : ''} ago`
  }

  const quickActions = [
    {
      title: "Add Product",
      description: "Add new Ayurvedic products",
      icon: <Plus className="w-8 h-8" />,
      href: "/admin/products/add",
      color: "bg-blue-500",
    },
    {
      title: "Manage Products",
      description: "View and edit all products",
      icon: <Package className="w-8 h-8" />,
      href: "/admin/products",
      color: "bg-green-500",
    },
    {
      title: "Manage Users",
      description: "View patient accounts",
      icon: <Users className="w-8 h-8" />,
      href: "/admin/users",
      color: "bg-purple-500",
    },
    {
      title: "Manage Doctors",
      description: "View doctor profiles",
      icon: <Stethoscope className="w-8 h-8" />,
      href: "/admin/doctors",
      color: "bg-orange-500",
    },
    {
      title: "Appointments",
      description: "View all bookings",
      icon: <Calendar className="w-8 h-8" />,
      href: "/admin/appointments",
      color: "bg-pink-500",
    },
    {
      title: "Orders",
      description: "Manage product orders",
      icon: <ShoppingCart className="w-8 h-8" />,
      href: "/admin/orders",
      color: "bg-yellow-500",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Ayurveda platform</p>
          </div>
          <Link
            to="/admin/settings"
            className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        {!loading && !error && dashboardData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">👥</div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {dashboardData.stats.totalUsers}
                </div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">👨‍⚕️</div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {dashboardData.stats.totalDoctors}
                </div>
                <div className="text-sm text-muted-foreground">Active Doctors</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">📅</div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    {dashboardData.stats.appointmentChange > 0 ? '+' : ''}
                    {dashboardData.stats.appointmentChange}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {dashboardData.stats.totalAppointments}
                </div>
                <div className="text-sm text-muted-foreground">Appointments</div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-3xl">💰</div>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">
                    {dashboardData.stats.totalOrders} orders
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  ₹{(dashboardData.stats.totalRevenue / 1000).toFixed(1)}k
                </div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, idx) => (
                  <Link
                    key={idx}
                    to={action.href}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow group"
                  >
                    <div className={`${action.color} text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
              {dashboardData.recentActivities.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No recent activity</p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.recentActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(activity.time)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
