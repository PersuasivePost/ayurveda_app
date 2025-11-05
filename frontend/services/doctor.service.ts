import apiClient, { handleApiError } from '@/lib/api-client'
import { API_ENDPOINTS } from '@/config/api.config'
import type {
  Doctor,
  DoctorsListResponse,
  DoctorSignupRequest,
  LoginRequest,
  DoctorAuthResponse,
} from '@/types/api.types'

export const doctorService = {
  /**
   * Get all doctors
   */
  getAllDoctors: async (): Promise<Doctor[]> => {
    try {
      const response = await apiClient.get<DoctorsListResponse>(API_ENDPOINTS.DOCTORS)
      return response.data.doctors
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Get homepage statistics
   */
  getStats: async (): Promise<{ totalDoctors: number; totalPatients: number; averageRating: number }> => {
    try {
      const response = await apiClient.get<{ totalDoctors: number; totalPatients: number; averageRating: number }>(
        API_ENDPOINTS.DOCTORS_STATS
      )
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Register a new doctor
   */
  signup: async (data: DoctorSignupRequest): Promise<{ doctor: Doctor }> => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DOCTORS_SIGNUP, data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Doctor login
   */
  login: async (data: LoginRequest): Promise<DoctorAuthResponse> => {
    try {
      const response = await apiClient.post<DoctorAuthResponse>(API_ENDPOINTS.DOCTORS_LOGIN, data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
