import apiClient, { handleApiError } from '@/lib/api-client'

export interface DoshaQuestion {
  id: number
  question: string
  options: {
    text: string
    dosha: string | null
  }[]
}

export interface DoshaAnswer {
  questionId: number
  answer: string
}

export interface DoshaScores {
  vata: number
  pitta: number
  kapha: number
}

export interface DoshaRecommendations {
  description: string
  diet: string
  lifestyle: string
  tips: string[]
}

export interface DoshaResult {
  message: string
  result: string
  scores: DoshaScores
  recommendations: DoshaRecommendations
}

export interface UserDoshaResult {
  doshaBodyType: string
  scores: DoshaScores
  quizTakenAt: string
  recommendations: DoshaRecommendations
}

export interface DoshaHistory {
  _id: string
  result: string
  scores: DoshaScores
  createdAt: string
}

export const doshaService = {
  /**
   * Get quiz questions
   */
  getQuestions: async (): Promise<{ questions: DoshaQuestion[] }> => {
    try {
      const response = await apiClient.get<{ questions: DoshaQuestion[] }>('/dosha/questions')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Submit quiz answers
   */
  submitQuiz: async (answers: DoshaAnswer[]): Promise<DoshaResult> => {
    try {
      const response = await apiClient.post<DoshaResult>('/dosha/submit', { answers })
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Get user's dosha result
   */
  getResult: async (): Promise<UserDoshaResult> => {
    try {
      const response = await apiClient.get<UserDoshaResult>('/dosha/result')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },

  /**
   * Get quiz history
   */
  getHistory: async (): Promise<{ history: DoshaHistory[] }> => {
    try {
      const response = await apiClient.get<{ history: DoshaHistory[] }>('/dosha/history')
      return response.data
    } catch (error) {
      throw new Error(handleApiError(error))
    }
  },
}
