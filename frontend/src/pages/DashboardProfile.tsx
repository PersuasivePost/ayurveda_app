import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { authService } from '@/services/auth.service'
import { doshaService } from '@/services/dosha.service'
import type { User } from '@/types/api.types'

export default function DashboardProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [doshaResult, setDoshaResult] = useState<any>(null)
  const [doshaLoading, setDoshaLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  })

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const userData = await authService.getCurrentUser()
        setUser(userData)
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || '',
          password: ''
        })
        setError(null)
        
        // Fetch dosha result if available
        fetchDoshaResult()
      } catch (err) {
        setError('Failed to load profile data. Please try again.')
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const fetchDoshaResult = async () => {
    try {
      setDoshaLoading(true)
      const result = await doshaService.getResult()
      setDoshaResult(result)
    } catch (err) {
      // It's okay if dosha result doesn't exist yet
      console.log('No dosha result found:', err)
    } finally {
      setDoshaLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)
      setError(null)
      setSuccessMessage(null)
      
      // Only send fields that have been modified
      const updateData: any = {}
      if (formData.name !== user?.name) updateData.name = formData.name
      if (formData.phone !== user?.phone) updateData.phone = formData.phone
      if (formData.address !== user?.address) updateData.address = formData.address
      if (formData.password) updateData.password = formData.password
      
      if (Object.keys(updateData).length === 0) {
        setSuccessMessage('No changes to save')
        return
      }
      
      const updatedUser = await authService.updateProfile(updateData)
      setUser(updatedUser)
      setSuccessMessage('Profile updated successfully!')
      
      // Clear password field after successful update
      setFormData(prev => ({ ...prev, password: '' }))
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.')
      console.error('Error updating profile:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
            {successMessage}
          </div>
        )}
        
        {/* Dosha Result Card */}
        {doshaResult && (
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Your Dosha Constitution</h2>
                <p className="text-sm text-muted-foreground">
                  Taken on {new Date(doshaResult.quizTakenAt).toLocaleDateString()}
                </p>
              </div>
              <Link 
                to="/dosha-quiz"
                className="text-sm text-primary hover:underline"
              >
                Retake Quiz
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">
                {doshaResult.doshaBodyType}
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <div className="text-muted-foreground">Vata</div>
                  <div className="font-semibold">{doshaResult.scores?.vata || 0}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Pitta</div>
                  <div className="font-semibold">{doshaResult.scores?.pitta || 0}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-muted-foreground">Kapha</div>
                  <div className="font-semibold">{doshaResult.scores?.kapha || 0}</div>
                </div>
              </div>
            </div>
            
            {doshaResult.recommendations && (
              <div className="pt-4 border-t border-border/40">
                <p className="text-sm text-muted-foreground">
                  {doshaResult.recommendations.description}
                </p>
              </div>
            )}
          </div>
        )}
        
        {!doshaLoading && !doshaResult && (
          <div className="bg-muted/30 border border-border rounded-lg p-6 text-center space-y-3">
            <p className="text-muted-foreground">You haven't taken the Dosha Quiz yet.</p>
            <Link 
              to="/dosha-quiz"
              className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Take Dosha Quiz
            </Link>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl mx-auto">
            {formData.name ? formData.name.charAt(0).toUpperCase() : '👤'}
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-gray-50"
                disabled
                title="Email cannot be changed"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>
            
            <div>
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label htmlFor="address" className="text-sm font-medium">Address</label>
              <input 
                type="text" 
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="Enter your address"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="text-sm font-medium">New Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="Leave blank to keep current password"
              />
              <p className="text-xs text-muted-foreground mt-1">Leave blank if you don't want to change password</p>
            </div>
            
            <button 
              type="submit"
              disabled={saving}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
