'use client'

import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MapPin, Star, Clock } from "lucide-react"
import { doctorService } from "@/services/doctor.service"
import type { Doctor } from "@/types/api.types"

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")

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

  const specialties = ["All", ...new Set(doctors.map((d) => d.speciality).filter(Boolean))]

  const filtered = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All" || doctor.speciality === selectedSpecialty
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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading doctors...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No doctors found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <div
                  key={doctor._id}
                  className="rounded-lg border border-border/40 bg-card p-6 hover:shadow-lg transition space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="text-4xl">👨‍⚕️</div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="fill-primary text-primary" />
                      <span className="font-semibold text-foreground">4.8</span>
                      <span className="text-sm text-muted-foreground">(verified)</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-primary font-medium">{doctor.speciality || "General Practice"}</p>
                    <p className="text-xs text-muted-foreground mt-1">Verified practitioner</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 border-t border-border/40 pt-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {doctor.clinicAddress || "Location not specified"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      {doctor.availability && doctor.availability.length > 0 ? "Available" : "Contact for availability"}
                    </div>
                    <p className="text-sm font-medium text-foreground">₹{doctor.fee || 500}/consultation</p>
                  </div>

                  {/* CTA */}
                  <Link href={`/booking/${doctor._id}`} className="w-full block">
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
