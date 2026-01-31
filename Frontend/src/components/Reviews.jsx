import React from 'react';

const Reviews = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing coffee and beautiful patio setting! Perfect place to work or meet friends.',
      date: '2 weeks ago'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      comment: 'The best cappuccino in town. Love the atmosphere and friendly staff.',
      date: '1 month ago'
    },
    {
      name: 'Emily Davis',
      rating: 4,
      comment: 'Great coffee and pastries. The outdoor seating is lovely on sunny days.',
      date: '3 weeks ago'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our valued customers have to say about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex">{renderStars(review.rating)}</div>
                <span className="ml-2 text-gray-600 text-sm">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4 italic">"{review.comment}"</p>
              <p className="font-semibold text-gray-900">- {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;