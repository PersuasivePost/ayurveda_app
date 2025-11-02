

import { useState } from "react"
import { MapPin, Star, Clock, Phone, MessageCircle, ChevronRight, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
  distance: string
  rating: number
  reviews: number
  consultationFee: number
  image: string
  dosha: string
  experience: string
  availability: string[]
  freeSlots: number
  therapyType: "online" | "in-person" | "both"
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    specialty: "General Wellness & Digestion",
    location: "Mumbai, India",
    distance: "2.3 km away",
    rating: 4.9,
    reviews: 128,
    consultationFee: 500,
    image: "👨‍⚕️",
    dosha: "Vata Specialist",
    experience: "15 years",
    availability: ["Today 2 PM", "Tomorrow 10 AM", "Jan 15 3 PM"],
    freeSlots: 3,
    therapyType: "both",
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    specialty: "Skin & Beauty Wellness",
    location: "Mumbai, India",
    distance: "3.1 km away",
    rating: 4.8,
    reviews: 96,
    consultationFee: 600,
    image: "👩‍⚕️",
    dosha: "Pitta Specialist",
    experience: "12 years",
    availability: ["Today 4 PM", "Tomorrow 2 PM", "Jan 16 11 AM"],
    freeSlots: 2,
    therapyType: "online",
  },
  {
    id: "3",
    name: "Dr. Amit Patel",
    specialty: "Joint Pain & Mobility",
    location: "Mumbai, India",
    distance: "1.8 km away",
    rating: 4.7,
    reviews: 156,
    consultationFee: 550,
    image: "👨‍⚕️",
    dosha: "Kapha Specialist",
    experience: "18 years",
    availability: ["Today 3 PM", "Jan 14 5 PM", "Jan 15 9 AM"],
    freeSlots: 4,
    therapyType: "in-person",
  },
  {
    id: "4",
    name: "Dr. Neha Singh",
    specialty: "Women's Health & Fertility",
    location: "Mumbai, India",
    distance: "2.8 km away",
    rating: 4.9,
    reviews: 203,
    consultationFee: 650,
    image: "👩‍⚕️",
    dosha: "Vata-Pitta Balance",
    experience: "14 years",
    availability: ["Tomorrow 11 AM", "Jan 15 2 PM", "Jan 16 4 PM"],
    freeSlots: 5,
    therapyType: "both",
  },
]

export function MapFinder() {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)
  const [searchLocation, setSearchLocation] = useState("Mumbai")
  const [filterType, setFilterType] = useState<"all" | "online" | "in-person">("all")

  const filteredDoctors = mockDoctors.filter(
    (doctor) =>
      filterType === "all" ||
      (filterType === "online" && (doctor.therapyType === "online" || doctor.therapyType === "both")) ||
      (filterType === "in-person" && (doctor.therapyType === "in-person" || doctor.therapyType === "both")),
  )

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location Search */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Enter your location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as "all" | "online" | "in-person")}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/40 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Types</option>
              <option value="online">Online Consultation</option>
              <option value="in-person">In-Person Visit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6 text-sm text-muted-foreground">
        Found <span className="font-semibold text-foreground">{filteredDoctors.length}</span> Ayurvedic doctors and
        therapists near
        <span className="font-semibold text-foreground"> {searchLocation}</span>
      </div>

      {/* Map and Doctors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-24 rounded-lg border border-border/40 overflow-hidden h-[500px] bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center space-y-3">
              <MapPin size={40} className="mx-auto text-primary opacity-50" />
              <p className="text-sm text-muted-foreground">Interactive map would appear here</p>
              <p className="text-xs text-muted-foreground">with doctor location markers</p>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedDoctorId(doctor.id)}
            >
              <div className="p-6 space-y-4">
                {/* Doctor Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{doctor.image}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {doctor.distance}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                      <Star size={16} className="fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{doctor.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{doctor.reviews} reviews</p>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border/40">
                  <div className="text-center space-y-1">
                    <div className="text-sm font-semibold text-foreground">{doctor.dosha}</div>
                    <p className="text-xs text-muted-foreground">Specialty</p>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-sm font-semibold text-foreground">{doctor.experience}</div>
                    <p className="text-xs text-muted-foreground">Experience</p>
                  </div>
                  <div className="text-center space-y-1">
                    <div className="text-sm font-semibold text-foreground">₹{doctor.consultationFee}</div>
                    <p className="text-xs text-muted-foreground">Per Session</p>
                  </div>
                </div>

                {/* Availability and Actions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-secondary" />
                      <span className="text-sm font-medium text-foreground">
                        {doctor.freeSlots} free slots available
                      </span>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
                      {doctor.therapyType === "both"
                        ? "Online & In-person"
                        : doctor.therapyType === "online"
                          ? "Online Only"
                          : "In-person Only"}
                    </span>
                  </div>

                  {/* Quick availability */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">Next Available</p>
                    <div className="flex gap-2 flex-wrap">
                      {doctor.availability.slice(0, 2).map((slot, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium"
                        >
                          {slot}
                        </span>
                      ))}
                    </div>
                  </div>

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
                    <Link to={`/booking/${doctor.id}`} onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 gap-2">
                        Book
                        <ChevronRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
