import { Link, useNavigate } from "react-router-dom"
import { LoginForm } from "@/components/forms/login-form"
import { useState } from "react"

export default function LoginPage() {
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (email: string, password: string) => {
    console.log("[v0] Login attempt:", email)
    setSubmitted(true)
    // In production: call auth API here
    // For now, redirect to dashboard
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold text-lg mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              🌿
            </div>
            <span className="text-foreground">Ayurveda</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your wellness journey</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/40 rounded-lg p-8 space-y-6">
          <LoginForm onSubmit={handleSubmit} />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue as</span>
            </div>
          </div>

          {/* Social Login Placeholders */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border/40 rounded-lg hover:bg-muted transition">
              <span>🔵</span>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-border/40 rounded-lg hover:bg-muted transition">
              <span>🍎</span>
              <span className="text-sm font-medium">Apple</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-primary hover:text-primary/90">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-primary hover:text-primary/90">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
