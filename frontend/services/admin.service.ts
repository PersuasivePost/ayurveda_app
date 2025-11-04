import apiClient, { handleApiError } from '../lib/api-client'
import { API_ENDPOINTS } from '../config/api.config'

export interface AdminLoginRequest {
  email: string
  password: string
}

export interface AdminLoginResponse {
  token: string
  admin: {
    email: string
  }
}

export interface AdminStats {
  totalUsers: number
  totalDoctors: number
  totalAppointments: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  appointmentChange: number
}

export interface RecentActivity {
  action: string
  user: string
  time: string
}

export interface AdminDashboardData {
  stats: AdminStats
  recentActivities: RecentActivity[]
}

export const adminService = {
  /**
   * Admin login
   */
  login: async (data: AdminLoginRequest): Promise<AdminLoginResponse> => {
    try {
      const response = await apiClient.post<AdminLoginResponse>(API_ENDPOINTS.ADMIN_LOGIN, data)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Get admin dashboard statistics
   */
  getDashboardStats: async (): Promise<AdminDashboardData> => {
    try {
      const response = await apiClient.get<AdminDashboardData>(API_ENDPOINTS.ADMIN_STATS)
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
