import React from 'react';

const GoogleReviews = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Find Us on Google
        </h3>
        <p className="text-gray-600 mb-6">
          Read more reviews and leave your own on our Google Business page
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          View Google Reviews
        </button>
      </div>
    </section>
  );
};

export default GoogleReviews;