import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navigation from './components/Navigation'

import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import GoogleReviews from './components/GoogleReviews'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import { FiArrowUp } from 'react-icons/fi'
import { initAnalytics } from './utils/analytics'

// Wrapper component for 80% width constraint
const WidthWrapper = ({ children }) => (
  <div className="w-[80%] mx-auto">
    {children}
  </div>
)

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    initAnalytics()
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Hero />
            <div className="relative bg-gradient-to-br from-cafe-cream via-white to-transparent overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-teal-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-forest-primary rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-sage-light rounded-full blur-3xl"></div>
              </div>
              <div className="relative">
                <WidthWrapper>
                  <About />
                  <Menu />
                  <Reviews />
                  <GoogleReviews />
                  <Gallery />
                  <Contact />
                  <Newsletter />
                </WidthWrapper>
              </div>
            </div>
            <div className="relative bg-gradient-to-br from-cafe-cream via-white to-transparent overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-teal-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-forest-primary rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-sage-light rounded-full blur-3xl"></div>
              </div>
              <div className="relative">
                <Footer />
              </div>
            </div>

            {/* Scroll to Top Button */}
            {showScrollTop && (
              <div className="relative bottom-0 right-0 z-40">
                <button
                  onClick={scrollToTop}
                  className="btn-hover !fixed bottom-8 right-8 bg-teal-accent text-white p-3 rounded-full shadow-lg hover:bg-teal-accent/90 transition-all duration-300"
                  aria-label="Scroll to top"
                >
                  <FiArrowUp size={20} />
                </button>
              </div>
            )}
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
