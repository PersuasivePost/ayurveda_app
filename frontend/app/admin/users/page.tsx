

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, UserCheck, UserX, Edit, Trash2 } from "lucide-react"

const USERS_DATA = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Patient",
    status: "active",
    joinDate: "2024-11-15",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    email: "rajesh@example.com",
    role: "Doctor",
    status: "active",
    joinDate: "2024-10-20",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@example.com",
    role: "Patient",
    status: "suspended",
    joinDate: "2024-09-10",
  },
  {
    id: 4,
    name: "Dr. Meera Patel",
    email: "meera@example.com",
    role: "Doctor",
    status: "active",
    joinDate: "2024-11-05",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Patient",
    status: "active",
    joinDate: "2024-11-01",
  },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("All")

  const filtered = USERS_DATA.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "All" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage all platform users</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add User</Button>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Patient", "Doctor", "Admin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  roleFilter === role
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg border border-border/40 bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border/40">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Join Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/20 transition">
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user.status === "active" ? "bg-primary" : "bg-destructive"
                          }`}
                        />
                        <span className="capitalize text-muted-foreground">{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                          <Edit size={16} className="text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                          {user.status === "active" ? (
                            <UserX size={16} className="text-destructive" />
                          ) : (
                            <UserCheck size={16} className="text-primary" />
                          )}
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition">
                          <Trash2 size={16} className="text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} of {USERS_DATA.length} users
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
