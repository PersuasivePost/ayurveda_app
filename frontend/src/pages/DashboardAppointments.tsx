import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useState, useEffect } from "react"
import { appointmentService } from "@/services/appointment.service"
import type { Appointment } from "@/types/api.types"

export default function DashboardAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getMyAppointments()
        setAppointments(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load appointments")
        console.error("Error fetching appointments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage your scheduled consultations</p>
        </div>
        
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading appointments...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!loading && !error && appointments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No appointments found.</p>
          </div>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const doctor = typeof apt.doctor === 'object' ? apt.doctor : null
              const doctorName = doctor?.name || 'Doctor'
              const doctorSpeciality = doctor?.speciality || ''
              const doctorFee = doctor?.fee || apt.fee || 0
              
              return (
                <div key={apt._id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{doctorName}</h3>
                        {doctorSpeciality && (
                          <p className="text-sm text-muted-foreground">{doctorSpeciality}</p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">Date:</span> {formatDate(apt.date)} at {formatTime(apt.date)}
                        </p>
                        {apt.mode && (
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Mode:</span> <span className="capitalize">{apt.mode}</span>
                          </p>
                        )}
                        {doctorFee > 0 && (
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Fee:</span> ₹{doctorFee}
                          </p>
                        )}
                        {apt.payment_status && (
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Payment:</span>{' '}
                            <span className={`capitalize ${
                              apt.payment_status === 'paid' ? 'text-green-600' :
                              apt.payment_status === 'failed' ? 'text-red-600' :
                              'text-yellow-600'
                            }`}>
                              {apt.payment_status}
                            </span>
                          </p>
                        )}
                        {apt.notes && (
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-medium">Notes:</span> {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      apt.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {apt.status || 'Requested'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
