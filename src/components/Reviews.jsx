import React, { useState } from 'react'
import { FiStar, FiFilter } from 'react-icons/fi'
import { reviews as allReviews, reviewCategories } from '../data/reviews'

const Reviews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [displayedReviews, setDisplayedReviews] = useState(allReviews.slice(0, 6))

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    if (categoryId === 'all') {
      setDisplayedReviews(allReviews.slice(0, 6))
    } else {
      setDisplayedReviews(allReviews.filter((review) => review.category === categoryId).slice(0, 6))
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={index < rating ? 'text-cafe-teal fill-cafe-teal' : 'text-gray-300'}
        size={18}
      />
    ))
  }

  return (
    <section id="reviews" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cafe-teal text-sm uppercase tracking-wider font-medium">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark mt-4 mb-6">
            What Our Guests Say
          </h2>
          <div className="w-20 h-1 bg-cafe-teal mx-auto mb-6"></div>
          <p className="text-lg text-cafe-dark/70 max-w-2xl mx-auto">
            Don't just take our word for it—hear from our valued customers
            about their experiences at HOPIN PATIO Cafe.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center gap-2 text-cafe-dark/70 mb-2 md:mb-0">
            <FiFilter size={18} />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {reviewCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-cafe-teal text-cafe-dark shadow-md'
                  : 'bg-cafe-cream text-cafe-dark/70 hover:bg-white'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedReviews.map((review, index) => (
            <div
              key={index}
              className="bg-cafe-cream p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
              </div>
              <p className="text-cafe-dark/80 mb-4 leading-relaxed italic">
                "{review.text}"
              </p>
              <div className="border-t border-cafe-light pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-cafe-dark">{review.name}</p>
                  {review.category && (
                    <span className="text-xs px-2 py-1 bg-cafe-cream text-cafe-brown rounded-full">
                      {reviewCategories.find((c) => c.id === review.category)?.label}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-cafe-dark/60">{review.date}</p>
                  {review.helpful && (
                    <p className="text-xs text-cafe-dark/50">
                      {review.helpful} helpful
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <p className="text-cafe-dark/70 mb-4">
            Read more reviews on Google
          </p>
          <a
            href="https://share.google/CWq1SYP6Yi9uWChQ8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-cafe-teal text-cafe-teal font-semibold rounded-sm hover:bg-cafe-teal hover:text-white transition-all duration-300"
          >
            View All Reviews
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
