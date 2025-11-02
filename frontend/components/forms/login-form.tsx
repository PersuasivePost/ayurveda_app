

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"

interface LoginFormProps {
  onSubmit?: (email: string, password: string) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (onSubmit) {
      onSubmit(email, password)
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Email Address</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (errors.email) setErrors({ ...errors, email: "" })
          }}
          disabled={isLoading}
          className="w-full"
        />
        {errors.email && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              if (errors.password) setErrors({ ...errors, password: "" })
            }}
            disabled={isLoading}
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle size={16} />
            {errors.password}
          </div>
        )}
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded" />
          <span className="text-muted-foreground">Remember me</span>
        </label>
        <Link to="/auth/forgot-password" className="text-primary hover:text-primary/90 font-medium">
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:text-primary/90 font-medium">
          Sign up
        </Link>
      </p>
    </form>
  )
}
