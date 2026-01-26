import React, { useState, useEffect } from 'react'
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
          className="fixed bottom-8 right-8 z-40 bg-cafe-gold text-cafe-brown p-4 rounded-full shadow-lg hover:bg-cafe-brown hover:text-white transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </div>
  )
}

export default App
