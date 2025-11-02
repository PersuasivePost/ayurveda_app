"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { MapPin, Star, Clock } from "lucide-react"

// Mock doctors data
const DOCTORS = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    specialty: "General Wellness",
    rating: 4.9,
    reviews: 128,
    location: "New York, NY",
    availability: "Available Today",
    image: "👨‍⚕️",
    experience: "15 years",
    languages: ["English", "Hindi", "Sanskrit"],
    consultation_fee: 60,
  },
  {
    id: 2,
    name: "Dr. Meera Patel",
    specialty: "Skin & Beauty",
    rating: 4.8,
    reviews: 95,
    location: "Los Angeles, CA",
    availability: "Available Tomorrow",
    image: "👩‍⚕️",
    experience: "12 years",
    languages: ["English", "Gujarati"],
    consultation_fee: 65,
  },
  {
    id: 3,
    name: "Dr. Amit Singh",
    specialty: "Digestive Health",
    rating: 4.7,
    reviews: 142,
    location: "Chicago, IL",
    availability: "Available Today",
    image: "👨‍⚕️",
    experience: "18 years",
    languages: ["English", "Hindi"],
    consultation_fee: 70,
  },
  {
    id: 4,
    name: "Dr. Anjali Gupta",
    specialty: "Women's Health",
    rating: 4.9,
    reviews: 176,
    location: "San Francisco, CA",
    availability: "Available Tomorrow",
    image: "👩‍⚕️",
    experience: "14 years",
    languages: ["English", "Hindi", "Bengali"],
    consultation_fee: 75,
  },
  {
    id: 5,
    name: "Dr. Vikram Reddy",
    specialty: "Pain Management",
    rating: 4.6,
    reviews: 87,
    location: "Houston, TX",
    availability: "Available Today",
    image: "👨‍⚕️",
    experience: "16 years",
    languages: ["English", "Telugu"],
    consultation_fee: 70,
  },
  {
    id: 6,
    name: "Dr. Deepika Sharma",
    specialty: "Mental Wellness",
    rating: 4.8,
    reviews: 119,
    location: "Seattle, WA",
    availability: "Available Today",
    image: "👩‍⚕️",
    experience: "13 years",
    languages: ["English", "Hindi", "Marathi"],
    consultation_fee: 65,
  },
]

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")

  const specialties = ["All", ...new Set(DOCTORS.map((d) => d.specialty))]

  const filtered = DOCTORS.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Connect with Expert Ayurvedic Doctors</h1>
          <p className="text-lg text-muted-foreground">
            Find certified practitioners who specialize in your health concerns
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 border-b border-border/40">
        <div className="mx-auto max-w-6xl space-y-4">
          <Input
            placeholder="Search doctors by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedSpecialty === specialty
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-lg border border-border/40 bg-card p-6 hover:shadow-lg transition space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">{doctor.image}</div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{doctor.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor.reviews})</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">{doctor.experience} experience</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 border-t border-border/40 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {doctor.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      {doctor.availability}
                    </div>
                    <p className="text-sm font-medium text-foreground">₹{doctor.consultation_fee}/consultation</p>
                  </div>

                  {/* CTA */}
                  <Link href={`/booking/${doctor.id}`} className="w-full block">
                    <Button className="w-full bg-primary hover:bg-primary/90">Book Consultation</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
