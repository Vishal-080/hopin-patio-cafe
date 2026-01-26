import React, { useState } from 'react'
import { FiStar, FiPhone, FiShoppingCart } from 'react-icons/fi'

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(0)
  const menuCategories = [
    {
      title: 'Signature Coffee',
      items: [
        {
          name: 'HOPIN Espresso',
          description: 'Our signature blend, rich and bold with notes of dark chocolate',
          price: '$6.50',
          featured: true,
        },
        {
          name: 'Patio Latte',
          description: 'Smooth espresso with steamed milk and a touch of vanilla',
          price: '$7.50',
        },
        {
          name: 'Golden Cappuccino',
          description: 'Classic cappuccino with a hint of caramel and gold leaf',
          price: '$8.00',
          featured: true,
        },
        {
          name: 'Cold Brew Deluxe',
          description: 'Slow-steeped for 24 hours, served over ice with cream',
          price: '$7.00',
        },
      ],
    },
    {
      title: 'Artisan Pastries',
      items: [
        {
          name: 'Croissant Selection',
          description: 'Butter, chocolate, or almond - baked fresh daily',
          price: '$5.50',
        },
        {
          name: 'Luxury Cheesecake',
          description: 'New York style with seasonal fruit compote',
          price: '$9.50',
          featured: true,
        },
        {
          name: 'Chocolate Éclair',
          description: 'French pastry filled with vanilla cream',
          price: '$6.00',
        },
        {
          name: 'Macaron Assortment',
          description: 'Six delicate French macarons in various flavors',
          price: '$12.00',
        },
      ],
    },
    {
      title: 'Light Bites',
      items: [
        {
          name: 'Avocado Toast Deluxe',
          description: 'Sourdough, smashed avocado, poached egg, microgreens',
          price: '$11.00',
        },
        {
          name: 'Quiche Lorraine',
          description: 'Classic French quiche with bacon and Gruyère',
          price: '$10.50',
        },
        {
          name: 'Mediterranean Wrap',
          description: 'Grilled vegetables, feta, hummus, and fresh herbs',
          price: '$9.50',
        },
        {
          name: 'Soup of the Day',
          description: 'Chef\'s daily selection, served with artisan bread',
          price: '$8.00',
        },
      ],
    },
  ]

  return (
    <section id="menu" className="py-20 md:py-32 bg-gradient-to-br from-teal-light via-white to-teal-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-teal-primary text-sm uppercase tracking-wider font-medium">
            Our Menu
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-teal-dark mt-4 mb-6">
            Culinary Excellence
          </h2>
          <div className="w-20 h-1 bg-teal-primary mx-auto mb-6"></div>
          <p className="text-lg text-teal-dark/70 max-w-2xl mx-auto">
            Indulge in our carefully curated selection of premium coffees,
            artisan pastries, and light bites crafted with the finest ingredients.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-teal-gold text-teal-dark shadow-md'
                  : 'bg-white text-teal-dark/70 hover:bg-teal-light'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Menu Items with Images */}
        <div className="space-y-16">
          {menuCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={activeCategory === categoryIndex ? 'block' : 'hidden'}
            >
              <h3 className="text-3xl font-serif font-semibold text-teal-dark mb-8 text-center">
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group ${
                      item.featured ? 'border-2 border-teal-primary' : ''
                    }`}
                  >
                    {/* Menu Item Image */}
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-cafe-cream">
                      <img
                        src={
                          categoryIndex === 0
                            ? [
                                'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                              ][itemIndex] || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            : categoryIndex === 1
                            ? [
                                'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1524351199678-941a58a3df50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                              ][itemIndex] || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                            : [
                                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1509722747041-616af39b79a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1509722747041-616af39b79a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                              ][itemIndex] || 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                        }
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {item.featured && (
                        <div className="absolute top-2 right-2 bg-teal-primary text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <FiStar size={12} />
                          Popular
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xl font-serif font-semibold text-cafe-dark">
                          {item.name}
                        </h4>
                        {item.featured && (
                          <FiStar className="text-teal-primary" size={20} />
                        )}
                      </div>
                        <span className="text-teal-primary font-bold text-lg">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-teal-dark/70 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href="tel:+1234567890"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-primary to-teal-secondary text-white font-medium rounded-lg hover:from-teal-secondary hover:to-teal-deep transition-all duration-300 text-sm"
                      >
                        <FiPhone size={16} />
                        Call to Order
                      </a>
                      <button
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-teal-primary text-teal-primary font-medium rounded-lg hover:bg-teal-light transition-all duration-300 text-sm"
                      >
                        <FiShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-teal-dark/70 mb-6">
            Visit us to experience our full menu and seasonal specials
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-teal-primary to-teal-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-teal-secondary hover:to-teal-deep transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Reserve a Table
          </a>
        </div>
      </div>
    </section>
  )
}

export default Menu
