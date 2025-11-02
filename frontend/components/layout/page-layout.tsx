import type React from "react"
import { Header } from "./header"
import { Footer } from "./footer"

interface PageLayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

export function PageLayout({ children, showFooter = true }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
