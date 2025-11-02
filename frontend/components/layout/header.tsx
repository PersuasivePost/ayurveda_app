"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition">
            <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
            <span className="hidden sm:inline text-foreground">Ayurveda</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition group"
            >
              <Home size={16} className="group-hover:text-primary transition" />
              <span className="hidden lg:inline">Home</span>
            </Link>
            <Link
              href="/learn-ayurveda"
              className="text-sm text-muted-foreground hover:text-foreground transition font-medium hover:text-primary"
            >
              Learn Ayurveda
            </Link>
            <Link href="/quick-remedies" className="text-sm text-muted-foreground hover:text-foreground transition">
              Quick Remedies
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link href="/doctors" className="text-sm text-muted-foreground hover:text-foreground transition">
              Doctors
            </Link>
            <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition">
              Products
            </Link>
            <Link href="/quiz" className="text-sm text-muted-foreground hover:text-foreground transition">
              Body Type Quiz
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg hover:bg-muted transition">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
              <Home size={16} className="text-primary" />
              Home
            </Link>
            <Link href="/learn-ayurveda" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm font-medium">
              Learn Ayurveda
            </Link>
            <Link href="/quick-remedies" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm">
              Quick Remedies
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm">
              About
            </Link>
            <Link href="/doctors" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm">
              Doctors
            </Link>
            <Link href="/products" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm">
              Products
            </Link>
            <Link href="/quiz" className="block px-3 py-2 rounded-lg hover:bg-muted text-sm">
              Body Type Quiz
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login" className="flex-1">
                <Button variant="ghost" size="sm" className="w-full">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="flex-1">
                <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
