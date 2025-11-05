import { useParams, useNavigate } from "react-router-dom"
<<<<<<< HEAD
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { doctorService } from "@/services/doctor.service"
import { appointmentService } from "@/services/appointment.service"
import { paymentService } from "@/services/payment.service"
import { initializeRazorpay, createAppointmentPaymentOptions } from "../lib/razorpay"
import type { RazorpayResponse } from "../lib/razorpay"
import { useAuth } from "@/contexts/AuthContext"

interface Doctor {
  _id: string
  name: string
  speciality?: string
  fee?: number
  clinicAddress?: string
  phone?: string
}
=======
import { useState, useEffect } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { Button } from "@/components/ui/button"
import { appointmentService } from "@/services/appointment.service"
import { doctorService } from "@/services/doctor.service"
import type { Doctor } from "@/types/api.types"
>>>>>>> da77f9ce478641b245f7316c87122d4f16614301

export default function BookingPage() {
  const { doctorId } = useParams<{ doctorId: string }>()
  const navigate = useNavigate()
<<<<<<< HEAD
  const { user } = useAuth()
  
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState(false)
  
  // Form fields
  const [date, setDate] = useState("")
  const [mode, setMode] = useState<"online" | "offline">("online")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) return
      
      try {
        const doctors = await doctorService.getAllDoctors()
        const foundDoctor = doctors.find((d: Doctor) => d._id === doctorId)
        if (foundDoctor) {
          setDoctor(foundDoctor)
        } else {
          setError("Doctor not found")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load doctor details")
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [doctorId])

  const handleBooking = async () => {
    if (!doctorId || !date) {
      setError("Please select a date")
      return
    }

    setBooking(true)
    setError(null)

    try {
      // Step 1: Create appointment request
      const appointment = await appointmentService.createAppointment({
        doctorId,
        date: new Date(date).toISOString(),
        mode,
        notes,
      })

      // Step 2: Create Razorpay order for the appointment
      const razorpayOrder = await paymentService.createAppointmentOrder(appointment._id)

      // Step 3: Initialize Razorpay checkout
      const paymentOptions = createAppointmentPaymentOptions(
        appointment._id,
        {
          razorpayOrderId: razorpayOrder.order.id,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          keyId: razorpayOrder.key_id,
        },
        {
          name: user?.name,
          email: user?.email,
          phone: user?.phone || "1234567890",
        },
        doctor?.name || "Doctor",
        async (response: RazorpayResponse) => {
          // Step 4: Verify payment on backend
          try {
            await paymentService.verifyAppointmentPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              appointmentId: appointment._id,
            })

            alert("Appointment booked successfully!")
            navigate("/dashboard/appointments")
          } catch (err) {
            setError(err instanceof Error ? err.message : "Payment verification failed")
          } finally {
            setBooking(false)
          }
        },
        () => {
          // Payment cancelled
          setBooking(false)
          setError("Payment cancelled. Your appointment has been created but not confirmed.")
        }
      )

      await initializeRazorpay(paymentOptions)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed")
      setBooking(false)
=======
  
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00',
    mode: 'online' as 'online' | 'offline',
    notes: ''
  })

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      if (!doctorId) return
      try {
        const doctors = await doctorService.getAllDoctors()
        const foundDoctor = doctors.find(d => d._id === doctorId)
        if (foundDoctor) {
          setDoctor(foundDoctor)
        }
      } catch (err) {
        console.error("Error fetching doctor:", err)
      }
    }
    fetchDoctor()
  }, [doctorId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!doctorId) {
      setError("Doctor ID is required")
      return
    }
    
    if (!formData.date || !formData.time) {
      setError("Please select both date and time")
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      
      // Combine date and time into a single Date object
      const dateTime = new Date(`${formData.date}T${formData.time}:00`)
      
      await appointmentService.createAppointment({
        doctorId,
        date: dateTime.toISOString(),
        mode: formData.mode,
        notes: formData.notes
      })
      
      setSuccess(true)
      
      // Redirect to appointments page after 2 seconds
      setTimeout(() => {
        navigate('/dashboard/appointments')
      }, 2000)
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book appointment")
      console.error("Booking error:", err)
    } finally {
      setLoading(false)
>>>>>>> da77f9ce478641b245f7316c87122d4f16614301
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <PageLayout>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Book Appointment</h1>
            <p className="text-lg text-muted-foreground">
<<<<<<< HEAD
              Schedule your consultation with {loading ? "..." : doctor?.name || "Doctor"}
=======
              Schedule your consultation with {doctor?.name || 'Doctor'}
>>>>>>> da77f9ce478641b245f7316c87122d4f16614301
            </p>
            {doctor?.speciality && (
              <p className="text-sm text-muted-foreground">
                Speciality: {doctor.speciality}
              </p>
            )}
            {doctor?.fee && (
              <p className="text-sm font-medium text-foreground">
                Consultation Fee: ₹{doctor.fee}
              </p>
            )}
          </div>
<<<<<<< HEAD

          {loading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading doctor details...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!loading && doctor && (
            <div className="space-y-6">
              {/* Doctor Info Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Doctor Details</h2>
                <div className="space-y-2">
                  <p><strong>Name:</strong> Dr. {doctor.name}</p>
                  {doctor.speciality && <p><strong>Speciality:</strong> {doctor.speciality}</p>}
                  {doctor.fee && (
                    <p className="text-2xl font-bold text-primary mt-4">
                      Consultation Fee: ₹{doctor.fee}
                    </p>
                  )}
                  {doctor.clinicAddress && <p><strong>Address:</strong> {doctor.clinicAddress}</p>}
                  {doctor.phone && <p><strong>Phone:</strong> {doctor.phone}</p>}
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Appointment Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-2">Select Date *</label>
                    <input
                      type="date"
                      min={today}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Consultation Mode</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value as "online" | "offline")}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    >
                      <option value="online">Online</option>
                      <option value="offline">In-Person</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Reason for Visit</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      rows={4}
                      placeholder="Describe your health concerns or reason for consultation..."
                    />
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBooking}
                  disabled={booking || !date}
                >
                  {booking ? "Processing..." : `Pay ₹${doctor.fee || 0} & Book Appointment`}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          )}
=======
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center">
              Appointment booked successfully! Redirecting to appointments...
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="date" className="text-sm font-medium">Select Date</label>
                <input 
                  type="date" 
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={today}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                  required
                />
              </div>
              
              <div>
                <label htmlFor="time" className="text-sm font-medium">Select Time</label>
                <select 
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  required
                >
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="mode" className="text-sm font-medium">Consultation Mode</label>
                <select 
                  id="mode"
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md"
                  required
                >
                  <option value="online">Online</option>
                  <option value="offline">In-Person</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="notes" className="text-sm font-medium">Reason for Visit (Optional)</label>
                <textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md" 
                  rows={4}
                  placeholder="Describe your health concerns..."
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={loading || success}
            >
              {loading ? "Booking..." : success ? "Booked!" : "Confirm Booking"}
            </Button>
          </form>
>>>>>>> da77f9ce478641b245f7316c87122d4f16614301
        </div>
      </div>
    </PageLayout>
  )
}
