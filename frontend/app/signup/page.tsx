"use client"

import Link from "next/link"
import { SignUpForm, type SignUpData } from "@/components/forms/signup-form"
import { useState } from "react"

export default function SignUpPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (data: SignUpData) => {
    console.log("[v0] Signup attempt:", data.email, "as", data.userType)
    setSubmitted(true)
    // In production: call auth API here
    // For now, redirect to dashboard
    window.location.href = "/dashboard"
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
          <h1 className="text-3xl font-bold text-foreground">Join Us</h1>
          <p className="text-muted-foreground">Begin your personalized wellness journey</p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border/40 rounded-lg p-8">
          <SignUpForm onSubmit={handleSubmit} />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:text-primary/90">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:text-primary/90">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
