

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

const CONTENT_DATA = [
  { id: 1, title: "Benefits of Ashwagandha", type: "Article", status: "published", views: 1247, date: "2024-11-10" },
  { id: 2, title: "Seasonal Detox Guide", type: "Article", status: "draft", views: 0, date: "2024-11-15" },
  { id: 3, title: "Ayurvedic Skincare", type: "Guide", status: "published", views: 3421, date: "2024-10-25" },
  { id: 4, title: "Turmeric Benefits", type: "Article", status: "published", views: 2156, date: "2024-11-01" },
  { id: 5, title: "Meditation for Vata", type: "Video", status: "published", views: 542, date: "2024-11-08" },
]

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("All")

  const filtered = CONTENT_DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "All" || item.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground">Manage articles, guides, and resources</p>
          </div>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus size={18} />
            Create Content
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Article", "Guide", "Video"].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-lg border border-border/40 bg-card p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground line-clamp-2">{item.title}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                      item.status === "published" ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye size={16} />
                    {item.views}
                  </div>
                  <p className="text-muted-foreground">{item.date}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-border/40">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Edit size={16} />
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
