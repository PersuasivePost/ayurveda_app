"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"

export default function BookingPage({ params }: { params: { doctorId: string } }) {
  const [step, setStep] = useState<"date" | "time" | "details" | "confirm">("date")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [reason, setReason] = useState("")

  // Mock doctor data
  const doctor = {
    name: "Dr. Rajesh Kumar",
    specialty: "General Wellness",
    experience: "15 years",
    consultationFee: 60,
    image: "👨‍⚕️",
  }

  const availableDates = ["2025-01-15", "2025-01-16", "2025-01-17", "2025-01-20"]
  const availableTimes = ["10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM"]

  const handleNext = () => {
    if (step === "date") setStep("time")
    else if (step === "time") setStep("details")
    else if (step === "details") setStep("confirm")
    else if (step === "confirm") {
      console.log("[v0] Booking confirmed:", { doctor, selectedDate, selectedTime, reason })
      alert("Booking confirmed! Check your email for details.")
    }
  }

  const canProceed = {
    date: !!selectedDate,
    time: !!selectedTime,
    details: !!reason,
    confirm: true,
  }[step]

  return (
    <PageLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Book Consultation</h1>

            {/* Progress Steps */}
            <div className="flex items-center gap-2 md:gap-4">
              {["date", "time", "details", "confirm"].map((s, idx) => (
                <div key={s} className="flex items-center gap-2 md:gap-4 flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                      step === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className="hidden sm:inline text-sm text-muted-foreground capitalize">{s}</span>
                  {idx < 3 && <div className="flex-1 h-0.5 bg-muted hidden md:block" />}
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Info Card */}
          <div className="rounded-lg border border-border/40 bg-card p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{doctor.image}</div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">{doctor.experience} experience</p>
                <p className="text-lg font-bold text-foreground mt-2">₹{doctor.consultationFee}/session</p>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="rounded-lg border border-border/40 bg-card p-8 space-y-6 mb-8">
            {step === "date" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Select Date</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`p-4 rounded-lg border-2 text-center transition ${
                        selectedDate === date
                          ? "border-primary bg-primary/10"
                          : "border-border/40 hover:border-border/60"
                      }`}
                    >
                      <p className="font-semibold text-foreground">{new Date(date).getDate()}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "time" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Select Time</h2>
                <p className="text-sm text-muted-foreground">Selected: {new Date(selectedDate).toLocaleDateString()}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-4 rounded-lg border-2 text-center transition ${
                        selectedTime === time
                          ? "border-primary bg-primary/10"
                          : "border-border/40 hover:border-border/60"
                      }`}
                    >
                      <Clock size={20} className="mx-auto mb-2" />
                      <p className="font-semibold text-foreground text-sm">{time}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === "details" && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Consultation Details</h2>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Reason for Consultation</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe your health concerns or reasons for this consultation..."
                    className="w-full px-4 py-3 rounded-lg border border-border/40 bg-background text-foreground"
                    rows={5}
                  />
                </div>

                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground mb-3 font-medium">Before your consultation:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Prepare any medical reports or documents</li>
                    <li>• Note down specific symptoms and when they occur</li>
                    <li>• Have water and light snacks available</li>
                    <li>• Find a quiet, well-lit space for the video call</li>
                  </ul>
                </div>
              </div>
            )}

            {step === "confirm" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground">Confirm Booking</h2>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Doctor</p>
                      <p className="font-semibold text-foreground">{doctor.name}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold text-foreground">
                        {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                      </p>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/40">
                      <p className="text-sm text-muted-foreground">Consultation Fee</p>
                      <p className="font-bold text-lg text-foreground">₹{doctor.consultationFee}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-border/40 bg-card">
                    <h4 className="font-semibold text-foreground mb-2">Consultation Details</h4>
                    <p className="text-sm text-muted-foreground">{reason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (step === "date") return
                const steps: Array<"date" | "time" | "details" | "confirm"> = ["date", "time", "details", "confirm"]
                const currentIdx = steps.indexOf(step)
                setStep(steps[currentIdx - 1])
              }}
              disabled={step === "date"}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border/40 hover:bg-muted transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === "confirm" ? "Confirm Booking" : "Continue"}
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
