import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function AdminContent() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage articles, remedies, and educational content</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-4">
            <button className="w-full bg-primary text-primary-foreground py-3 rounded-md hover:bg-primary/90">
              + Add New Article
            </button>
            
            <div className="space-y-2">
              {[
                { title: "Understanding Vata Dosha", status: "Published", date: "Nov 1, 2025" },
                { title: "Seasonal Diet Guide", status: "Draft", date: "Nov 2, 2025" },
                { title: "Yoga for Pitta Balance", status: "Published", date: "Oct 28, 2025" },
              ].map((content, idx) => (
                <div key={idx} className="border border-border rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{content.title}</h3>
                    <p className="text-xs text-muted-foreground">{content.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    content.status === 'Published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {content.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
