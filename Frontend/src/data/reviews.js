// Reviews data structure for HOPIN PATIO Cafe
// Update this file with actual reviews from Google Reviews
// Format: { name, rating, text, date, category?, helpful? }

export const reviews = [
  {
    name: 'Sarah Mitchell',
    rating: 5,
    text: 'Absolutely stunning atmosphere! The patio setting is perfect, and the coffee is exceptional. This has become my favorite spot for weekend brunches.',
    date: '2 weeks ago',
    category: 'atmosphere',
    helpful: 12,
  },
  {
    name: 'James Chen',
    rating: 5,
    text: 'The best cafe experience I\'ve had. The attention to detail in every aspect - from the presentation to the service - is remarkable. Highly recommend!',
    date: '1 month ago',
    category: 'service',
    helpful: 8,
  },
  {
    name: 'Emily Rodriguez',
    rating: 5,
    text: 'HOPIN PATIO exceeded all expectations. The Golden Cappuccino is divine, and the pastries are out of this world. The staff is incredibly welcoming.',
    date: '3 weeks ago',
    category: 'food',
    helpful: 15,
  },
  {
    name: 'Michael Thompson',
    rating: 5,
    text: 'A true gem! The ambiance is luxurious yet comfortable. Perfect for both business meetings and casual catch-ups. The coffee quality is outstanding.',
    date: '2 months ago',
    category: 'atmosphere',
    helpful: 10,
  },
  {
    name: 'Lisa Anderson',
    rating: 5,
    text: 'I love coming here for my morning coffee. The patio area is beautiful, and the service is always impeccable. It\'s become part of my daily routine.',
    date: '1 week ago',
    category: 'service',
    helpful: 6,
  },
  {
    name: 'David Park',
    rating: 5,
    text: 'Exceptional quality in every way. The menu is thoughtfully curated, and everything I\'ve tried has been delicious. The atmosphere is perfect for relaxation.',
    date: '3 weeks ago',
    category: 'food',
    helpful: 9,
  },
]

// Aggregate rating data
export const aggregateRating = {
  average: 4.9,
  totalReviews: 200,
  distribution: {
    5: 180,
    4: 15,
    3: 3,
    2: 1,
    1: 1,
  },
}

// Review categories for filtering
export const reviewCategories = [
  { id: 'all', label: 'All Reviews' },
  { id: 'atmosphere', label: 'Atmosphere' },
  { id: 'service', label: 'Service' },
  { id: 'food', label: 'Food & Drinks' },
]
