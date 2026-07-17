'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-geist font-bold text-xl text-primary">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm">
            BB
          </div>
          <span>Bantu Bid</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#solutions" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            Solutions
          </Link>
          <Link href="#suppliers" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            Suppliers
          </Link>
          <Link href="#mining-companies" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            Mining Companies
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            About
          </Link>
          <Link href="#resources" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
            Resources
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Join Platform
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-4 px-6 space-y-4">
          <Link href="#solutions" className="block text-gray-600 hover:text-primary font-medium">
            Solutions
          </Link>
          <Link href="#suppliers" className="block text-gray-600 hover:text-primary font-medium">
            Suppliers
          </Link>
          <Link href="#mining-companies" className="block text-gray-600 hover:text-primary font-medium">
            Mining Companies
          </Link>
          <Link href="#about" className="block text-gray-600 hover:text-primary font-medium">
            About
          </Link>
          <Link href="#resources" className="block text-gray-600 hover:text-primary font-medium">
            Resources
          </Link>
          <div className="pt-4 border-t border-gray-200 space-y-2">
            <Link href="/login" className="block px-4 py-2 text-center text-primary border border-primary rounded-lg text-sm font-medium">
              Login
            </Link>
            <Link href="/register" className="block px-4 py-2 bg-primary text-white text-center rounded-lg text-sm font-medium">
              Join Platform
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
