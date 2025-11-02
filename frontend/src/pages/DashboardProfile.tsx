import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function DashboardProfile() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl mx-auto">
            👤
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input 
                type="text" 
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Dosha Type</label>
              <select className="w-full mt-1 px-3 py-2 border border-border rounded-md">
                <option>Vata</option>
                <option>Pitta</option>
                <option>Kapha</option>
              </select>
            </div>
            
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
