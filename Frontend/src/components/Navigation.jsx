import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / windowHeight) * 100
      setScrollProgress(Math.min(scrolled, 100))
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'top-0 bg-white/95 backdrop-blur-md shadow-2xl luxury-shadow'
          : 'top-0 bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HOPIN PATIO CAFE
          </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-cafe-dark hover:text-cafe-teal hover:scale-105 transition-all duration-300 font-medium text-sm uppercase tracking-wider relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            {/* Reserve Now CTA */}
            <Link
              to="/#contact"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Reserve Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${
              isScrolled ? 'text-neutral-dark' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <FiX size={28} />
            ) : (
              <FiMenu size={28} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-cafe-light">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-cafe-dark hover:text-cafe-teal hover:bg-cafe-cream rounded-lg transition-colors duration-300 font-medium uppercase tracking-wider"
              >
                {item.name}
              </a>
            ))}
            {/* Mobile Reserve CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full px-4 py-3 bg-teal-primary text-white font-semibold uppercase tracking-wider rounded-lg hover:bg-teal-secondary hover:text-white transition-all duration-300 text-center mt-2"
            >
              Reserve Now
            </a>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
          }}
        ></div>
      </div>
    </nav>
  )
}

export default Navigation
