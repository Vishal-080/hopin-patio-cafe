// Reviews data structure for HOPIN PATIO Cafe
// Update this file with actual reviews from Google Reviews
// Format: { name, rating, text, date, category?, helpful? }

export const reviews = [
  {
    name: 'Shivani Sharma',
    rating: 5,
    text: 'Lovely café with a warm and welcoming vibe. Amazing food and snacks, quick and friendly service. Ideal place for long conversations with friends.',
    date: '2 weeks ago',
    category: 'atmosphere',
    helpful: 12,
  },
  {
    name: 'Arjav Jain',
    rating: 5,
    text: 'One of my favourite cafés with a unique and soothing ambience. Amazing service, reasonably priced, and perfect for relaxed conversations with friends.',
    date: '1 month ago',
    category: 'atmosphere',
    helpful: 8,
  },
  {
    name: 'Muskan Yadav',
    rating: 5,
    text: 'Best soya chaap experience-both masala and malai versions are absolutely delicious. Highly recommended for chaap lovers.',
    date: '3 weeks ago',
    category: 'food',
    helpful: 15,
  },
  {
    name: 'Abhishek Vishwakarma',
    rating: 5,
    text: 'A mostly pleasant experience with a fantastic, calm atmosphere. The food stood out as flavorful and well-presented.',
    date: '2 months ago',
    category: 'atmosphere',
    helpful: 10,
  },
  {
    name: 'Sakshi Keswani',
    rating: 5,
    text: 'Excellent overall experience with amazing food, brilliant ambiance, great variety, and polite, humble staff.',
    date: '1 week ago',
    category: 'service',
    helpful: 6,
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
