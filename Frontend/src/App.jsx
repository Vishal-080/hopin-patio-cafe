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
    <div className="min-h-screen bg-gradient-to-br from-neutral via-primary-light/20 to-secondary-light/20">
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Hero />
            <About />
            <Menu />
            <Reviews />
            <GoogleReviews />
            <Gallery />
            <Contact />
            <Newsletter />
            <Footer />

            {/* Scroll to Top Button */}
            {showScrollTop && (
              <button
                onClick={scrollToTop}
                className="btn-hover fixed bottom-8 right-8 z-40 bg-teal-accent text-white p-4 rounded-full shadow-lg"
                aria-label="Scroll to top"
              >
                <FiArrowUp size={24} />
              </button>
            )}
          </>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
