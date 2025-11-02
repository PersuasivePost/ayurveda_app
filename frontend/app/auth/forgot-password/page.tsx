

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Email is required")
      return
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email")
      return
    }

    // Simulate API call
    console.log("[v0] Password reset requested for:", email)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-lg mb-6">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              🌿
            </div>
            <span className="text-foreground">Ayurveda</span>
          </Link>
          {!submitted ? (
            <>
              <h1 className="text-3xl font-bold text-foreground">Reset Your Password</h1>
              <p className="text-muted-foreground">Enter your email to receive reset instructions</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-foreground">Check Your Email</h1>
              <p className="text-muted-foreground">We've sent password reset instructions to your inbox</p>
            </>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/40 rounded-lg p-8 space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                />
                {error && (
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Send Reset Link
              </Button>
              <Link href="/login" className="block text-center text-sm text-primary hover:text-primary/90 font-medium">
                Back to login
              </Link>
            </form>
          ) : (
            <div className="space-y-6 py-6">
              <div className="flex justify-center">
                <CheckCircle size={48} className="text-primary" />
              </div>
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Password reset instructions have been sent to <strong>{email}</strong>
                </p>
                <p className="text-sm text-muted-foreground text-center">
                  Check your inbox and spam folder. The link will expire in 24 hours.
                </p>
              </div>
              <Link href="/login" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90">Back to Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
