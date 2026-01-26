import React, { useState } from 'react'
import { FiStar, FiFilter } from 'react-icons/fi'
import { reviews, aggregateRating, reviewCategories } from '../data/reviews'

const GoogleReviews = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredReviews, setFilteredReviews] = useState(reviews)

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    if (categoryId === 'all') {
      setFilteredReviews(reviews)
    } else {
      setFilteredReviews(reviews.filter((review) => review.category === categoryId))
    }
  }

  const renderStars = (rating, size = 20) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={index < rating ? 'text-cafe-teal fill-cafe-teal' : 'text-gray-300'}
        size={size}
      />
    ))
  }

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-cafe-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Aggregate Rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-lg shadow-lg mb-6">
            <div className="flex items-center gap-1">
              {renderStars(Math.round(aggregateRating.average), 24)}
            </div>
            <div className="text-left">
              <p className="text-3xl font-bold text-cafe-dark">
                {aggregateRating.average}
              </p>
              <p className="text-sm text-cafe-dark/70">
                from {aggregateRating.totalReviews}+ reviews
              </p>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark mb-4">
            Google Reviews
          </h2>
          <p className="text-lg text-cafe-dark/70 max-w-2xl mx-auto">
            See what our customers are saying about their experience at HOPIN PATIO Cafe
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
                  ? 'bg-cafe-gold text-cafe-dark shadow-md'
                  : 'bg-white text-cafe-dark/70 hover:bg-cafe-cream'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Reviews Carousel/Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-cafe-light"
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

        {/* CTA to Write Review */}
        <div className="text-center bg-cafe-teal/10 rounded-lg p-8">
          <h3 className="text-2xl font-serif font-semibold text-cafe-dark mb-4">
            Share Your Experience
          </h3>
          <p className="text-cafe-dark/70 mb-6 max-w-2xl mx-auto">
            Visited HOPIN PATIO Cafe? We'd love to hear about your experience!
          </p>
          <a
            href="https://share.google/CWq1SYP6Yi9uWChQ8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cafe-gold text-cafe-dark font-semibold uppercase tracking-wider rounded-sm hover:bg-cafe-brown hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Write a Review on Google
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

export default GoogleReviews
