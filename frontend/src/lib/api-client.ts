import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_CONFIG } from '@/config/api.config'
import type { ErrorResponse } from '@/types/api.types'

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  // Do not set a global Content-Type header so axios can correctly
  // set multipart/form-data boundaries when FormData is used.
})

// Request interceptor - Add auth token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(API_CONFIG.TOKEN_KEY)
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors globally and refresh token if needed
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Handle token expiration - attempt to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const token = localStorage.getItem(API_CONFIG.TOKEN_KEY)
        if (token) {
          // Try to refresh the token
          const response = await axios.post<{ token: string }>(
            `${API_CONFIG.BASE_URL}/auth/refresh`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          )
          
          if (response.data.token) {
            // Update token and retry request
            localStorage.setItem(API_CONFIG.TOKEN_KEY, response.data.token)
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${response.data.token}`
            }
            return apiClient(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
        // Clear auth and redirect to login
        localStorage.removeItem(API_CONFIG.TOKEN_KEY)
        localStorage.removeItem('user_type')
        localStorage.removeItem('temp_email')
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    // Handle specific error codes
    if (error.response) {
      const { status, data } = error.response

      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem(API_CONFIG.TOKEN_KEY)
          if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
            window.location.href = '/login'
          }
          break
        case 403:
          console.error('Forbidden:', data.message)
          break
        case 404:
          console.error('Not found:', data.message)
          break
        case 500:
          console.error('Server error:', data.message)
          break
        default:
          console.error('API error:', data.message)
      }
    } else if (error.request) {
      // Network error
      console.error('Network error: Could not connect to server')
    }

    return Promise.reject(error)
  }
)

// Helper function to handle API errors
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>
    return axiosError.response?.data?.message || axiosError.message || 'An error occurred'
  }
  return 'An unexpected error occurred'
}

// Auth helpers
export const setAuthToken = (token: string) => {
  localStorage.setItem(API_CONFIG.TOKEN_KEY, token)
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem(API_CONFIG.TOKEN_KEY)
}

export const removeAuthToken = () => {
  localStorage.removeItem(API_CONFIG.TOKEN_KEY)
}

export const isAuthenticated = (): boolean => {
  return !!getAuthToken()
}

export default apiClient
