import { Link } from "react-router-dom"
import { Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm">
                🌿
              </div>
              <span className="font-semibold text-foreground">Ayurveda</span>
            </div>
            <p className="text-sm text-muted-foreground">Ancient wisdom for modern wellness</p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/doctors" className="text-muted-foreground hover:text-foreground transition">
                  Doctors
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition">
                  Body Type Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <Mail size={16} /> support@ayurveda.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <Phone size={16} /> +91 (800) 123-4567
              </li>
              <li className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition cursor-pointer">
                <MapPin size={16} /> Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; {currentYear} Ayurvedic Wellness. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-foreground transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground transition">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-foreground transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
