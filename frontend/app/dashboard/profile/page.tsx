"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Edit2, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    email: "priya@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    location: "New York, NY",
    allergies: "None",
  })

  const handleSave = () => {
    console.log("[v0] Profile updated:", formData)
    setIsEditing(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <p className="text-muted-foreground">Manage your personal and health information</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/40 hover:bg-muted transition"
          >
            {isEditing ? (
              <>
                <X size={18} />
                Cancel
              </>
            ) : (
              <>
                <Edit2 size={18} />
                Edit
              </>
            )}
          </button>
        </div>

        {/* Profile Card */}
        <div className="rounded-lg border border-border/40 bg-card p-8 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-4xl">👩‍🦱</div>
            <div>
              <p className="text-sm text-muted-foreground">Profile Picture</p>
              {isEditing && (
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  Change Photo
                </Button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Gender</label>
                {isEditing ? (
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                ) : (
                  <Input value={formData.gender} disabled />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location</label>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Allergies */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Known Allergies</label>
              <textarea
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-lg border border-border/40 bg-background text-foreground disabled:opacity-50"
                rows={3}
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <Button onClick={handleSave} className="w-full bg-primary hover:bg-primary/90">
              <Save size={18} className="mr-2" />
              Save Changes
            </Button>
          )}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dosha Profile */}
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Your Dosha Profile</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Primary Dosha</p>
                <p className="text-lg font-semibold text-foreground">Vata (45%)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Secondary Dosha</p>
                <p className="text-lg font-semibold text-foreground">Pitta (40%)</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Retake Quiz
            </Button>
          </div>

          {/* Privacy & Security */}
          <div className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
            <h3 className="font-semibold text-foreground">Privacy & Security</h3>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Change Password
            </Button>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              Manage Sessions
            </Button>
            <Button variant="outline" size="sm" className="w-full text-destructive bg-transparent">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
