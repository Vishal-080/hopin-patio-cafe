import React from 'react';

const Menu = () => {
  const menuItems = [
    {
      category: 'Coffee',
      items: [
        { name: 'Espresso', price: '$3.50', description: 'Rich and bold single shot' },
        { name: 'Cappuccino', price: '$4.50', description: 'Espresso with steamed milk foam' },
        { name: 'Latte', price: '$5.00', description: 'Smooth espresso with steamed milk' },
        { name: 'Americano', price: '$4.00', description: 'Espresso with hot water' }
      ]
    },
    {
      category: 'Pastries',
      items: [
        { name: 'Croissant', price: '$3.00', description: 'Buttery, flaky French pastry' },
        { name: 'Muffin', price: '$3.50', description: 'Fresh baked daily varieties' },
        { name: 'Danish', price: '$4.00', description: 'Sweet pastry with fruit or cream' }
      ]
    }
  ];

  return (
    <section id="menu" className="py-16 lg:py-20 bg-gradient-to-br from-sage-light/20 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-forest-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 sm:w-48 sm:h-48 bg-teal-accent rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16 fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-primary mb-4 lg:mb-6 relative inline-block animate-element">
            Our Menu
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-accent to-transparent transform scale-x-50"></span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed px-4 fade-in stagger-2">
            Discover our carefully curated selection of premium coffees and fresh pastries, crafted with passion and served with care
          </p>
        </div>

        <div className="space-y-8 lg:space-y-10">
          {menuItems.map((category, index) => (
            <div key={index} className="group fade-in stagger-3">
              <div className="bg-white/90 backdrop-blur-sm border border-sage-light/20 rounded-2xl shadow-lg hover-card overflow-hidden">
                <div className="bg-gradient-to-r from-forest-primary to-teal-accent p-4 sm:p-6 relative">
                  <div className="absolute inset-0 bg-white/10 transform skewX-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white relative z-10 flex items-center justify-center">
                    <span className="mr-3 text-2xl sm:text-3xl">{category.category === 'Coffee' ? '☕' : '🥐'}</span>
                    {category.category}
                  </h3>
                </div>
                
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
                  {category.items.map((item, itemIndex) => (
                    <div 
                      key={itemIndex} 
                      className="bg-gradient-to-r from-cafe-cream/50 to-white border border-sage-light/10 rounded-xl p-3 sm:p-4 hover:border-teal-accent/30 transition-all duration-300 cursor-pointer touch-manipulation hover-lift"
                    >
                      <div className="flex justify-between items-start gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base sm:text-lg font-semibold text-forest-primary group-hover/item:text-teal-accent transition-colors duration-300 truncate">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1 leading-relaxed line-clamp-2">{item.description}</p>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span className="text-base sm:text-lg font-bold text-forest-primary bg-gradient-to-br from-sage-light/20 to-transparent px-2 py-1 sm:px-3 sm:py-1 rounded-lg whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-2 sm:mt-3 h-0.5 bg-gradient-to-r from-transparent via-teal-accent/30 to-transparent transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;