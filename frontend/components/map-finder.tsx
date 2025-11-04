import { useState, useEffect } from "react"
import { MapPin, Star, Clock, Phone, MessageCircle, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { doctorService } from "@/services/doctor.service"
import type { Doctor } from "@/types/api.types"

export function MapFinder() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLocation, setSearchLocation] = useState("")

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorService.getAllDoctors()
        setDoctors(data)
      } catch (error) {
        console.error("Failed to fetch doctors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const filteredDoctors = doctors.filter((doctor) => {
    if (searchLocation && !doctor.clinicAddress?.toLowerCase().includes(searchLocation.toLowerCase())) {
      return false
    }
    return true
  })

  if (loading) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-muted-foreground">Loading doctors...</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-sm overflow-hidden">
      {/* Search and Filter Bar */}
      <div className="p-6 border-b border-border/40 bg-card/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border/40 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-3 gap-6 p-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-6">
            <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex flex-col items-center justify-center gap-2 border border-border/40">
              <MapPin size={48} className="text-primary" />
              <p className="text-sm text-muted-foreground">Interactive map would appear here</p>
              <p className="text-xs text-muted-foreground">with doctor location markers</p>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors found. Try adjusting your search.</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor._id}
                className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="p-6 space-y-4">
                  {/* Doctor Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-4xl">👨‍⚕️</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                        <p className="text-sm text-primary font-medium">{doctor.speciality || "General Practice"}</p>
                        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                          <MapPin size={14} />
                          {doctor.clinicAddress || "Location not specified"}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 justify-end">
                        <Star size={16} className="fill-primary text-primary" />
                        <span className="font-semibold text-foreground">4.8</span>
                      </div>
                      <p className="text-xs text-muted-foreground">verified</p>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border/40">
                    <div className="text-center space-y-1">
                      <div className="text-sm font-semibold text-foreground">
                        {doctor.speciality || "General"}
                      </div>
                      <p className="text-xs text-muted-foreground">Specialty</p>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-sm font-semibold text-foreground text-xs">
                        {doctor.phone || "Contact via email"}
                      </div>
                      <p className="text-xs text-muted-foreground">Contact</p>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-sm font-semibold text-foreground">₹{doctor.fee || 500}</div>
                      <p className="text-xs text-muted-foreground">Per Session</p>
                    </div>
                  </div>

                  {/* Availability and Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-secondary" />
                        <span className="text-sm font-medium text-foreground">
                          {doctor.availability && doctor.availability.length > 0
                            ? `${doctor.availability.length} slots available`
                            : "Contact for availability"}
                        </span>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
                        Available
                      </span>
                    </div>

                    {/* Quick availability */}
                    {doctor.availability && doctor.availability.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase">Available Days</p>
                        <div className="flex gap-2 flex-wrap">
                          {doctor.availability.slice(0, 3).map((slot, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium"
                            >
                              {slot.day}: {slot.from} - {slot.to}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Phone size={16} />
                        <span className="hidden sm:inline">Call</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <MessageCircle size={16} />
                        <span className="hidden sm:inline">Chat</span>
                      </Button>
                      <Link to={`/booking/${doctor._id}`} onClick={(e) => e.stopPropagation()}>
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 gap-2">
                          Book
                          <ChevronRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
