

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"

interface SignUpFormProps {
  onSubmit?: (data: SignUpData) => void
}

export interface SignUpData {
  name: string
  email: string
  password: string
  confirmPassword: string
  userType: "patient" | "doctor" | "admin"
  agreeToTerms: boolean
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [formData, setFormData] = useState<SignUpData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "patient",
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const passwordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[A-Z]/.test(pwd)) strength++
    if (/[0-9]/.test(pwd)) strength++
    if (/[^A-Za-z0-9]/.test(pwd)) strength++
    return strength
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (onSubmit) {
      onSubmit(formData)
    }

    setIsLoading(false)
  }

  const strength = passwordStrength(formData.password)

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Full Name</label>
        <Input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value })
            if (errors.name) setErrors({ ...errors, name: "" })
          }}
          disabled={isLoading}
        />
        {errors.name && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.name}
          </div>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email Address</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value })
            if (errors.email) setErrors({ ...errors, email: "" })
          }}
          disabled={isLoading}
        />
        {errors.email && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.email}
          </div>
        )}
      </div>

      {/* User Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">I am a</label>
        <div className="grid grid-cols-3 gap-2">
          {["patient", "doctor", "admin"].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, userType: type as any })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                formData.userType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value })
              if (errors.password) setErrors({ ...errors, password: "" })
            }}
            disabled={isLoading}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Strength */}
        {formData.password && (
          <div className="space-y-2">
            <div className="flex gap-1 h-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`flex-1 rounded-full transition ${i < strength ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {strength === 0 && "Very weak"}
              {strength === 1 && "Weak"}
              {strength === 2 && "Fair"}
              {strength === 3 && "Good"}
              {strength === 4 && "Strong"}
            </p>
          </div>
        )}

        {errors.password && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.password}
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Confirm Password</label>
        <div className="relative">
          <Input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value })
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
            }}
            disabled={isLoading}
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.confirmPassword}
          </div>
        )}
      </div>

      {/* Terms */}
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) => {
            setFormData({ ...formData, agreeToTerms: e.target.checked })
            if (errors.agreeToTerms) setErrors({ ...errors, agreeToTerms: "" })
          }}
          className="mt-1"
        />
        <span className="text-sm text-muted-foreground">
          I agree to the{" "}
          <Link to="/terms" className="text-primary hover:text-primary/90 font-medium">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:text-primary/90 font-medium">
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.agreeToTerms && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle size={16} />
          {errors.agreeToTerms}
        </div>
      )}

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
