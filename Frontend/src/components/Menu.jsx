<<<<<<< Updated upstream
import React, { useState } from 'react'
import { FiStar, FiPhone, FiShoppingCart, FiClock } from 'react-icons/fi'
=======

import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { ClockIcon } from '@heroicons/react/24/outline';
>>>>>>> Stashed changes

const Menu = () => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['menu-categories'],
    queryFn: () => api.getMenuCategories(),
  });

  const { data: menuItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => api.getMenuItems(),
  });

  if (categoriesLoading || itemsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cafe-gold"></div>
      </div>
    );
  }

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {categories?.data?.map((category) => (
          <div key={category.id} className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems?.data
                ?.filter((item) => item.category.id === category.id)
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <span className="text-cafe-gold font-bold">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>
                      {item.preparationTime && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {item.preparationTime} min
                        </div>
                      )}
                      {item.dietaryInfo?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.dietaryInfo.map((diet, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                            >
                              {diet.type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;