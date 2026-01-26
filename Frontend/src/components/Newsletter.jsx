import React, { useState } from 'react'
import { FiMail } from 'react-icons/fi'
import { aggregateRating } from '../data/reviews'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to an email service
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <>
      {/* Newsletter Section in Footer Area */}
      <section className="py-16 bg-neutral-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FiMail className="mx-auto mb-4 text-cafe-teal" size={48} />
          <h3 className="text-3xl font-serif font-bold mb-4">
            Stay Connected
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about special offers,
            new menu items, and exclusive events at HOPIN PATIO Cafe.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-lg text-neutral-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Subscribe
            </button>
          </form>
          <p className="text-white/60 text-sm mt-4">
            Join {aggregateRating.totalReviews}+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Exit Intent Popup
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-cafe-dark/70 hover:text-cafe-dark"
            >
              <FiX size={24} />
            </button>
            <div className="text-center">
              <div className="bg-cafe-teal/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-cafe-teal" size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold text-cafe-dark mb-2">
                Special Offer for You!
              </h3>
              <p className="text-cafe-dark/70 mb-6">
                Subscribe now and get <span className="text-cafe-teal font-bold">10% off</span> your
                first visit to HOPIN PATIO Cafe.
              </p>
              {submitted ? (
                <p className="text-cafe-teal font-semibold">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300"
                  >
                    Get 10% Off
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}

export default Newsletter
