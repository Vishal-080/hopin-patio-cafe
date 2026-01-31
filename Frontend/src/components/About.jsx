import React, { useState } from 'react';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Premium Coffee",
      description: "Ethically sourced beans roasted to perfection",
      icon: "☕"
    },
    {
      title: "Patio Paradise", 
      description: "Beautiful outdoor setting with comfortable seating",
      icon: "🌿"
    },
    {
      title: "Fresh Pastries",
      description: "Locally-made treats baked daily",
      icon: "🥐"
    },
    {
      title: "Expert Baristas",
      description: "Friendly staff passionate about coffee",
      icon: "✨"
    },
    {
      title: "Perfect Ambiance",
      description: "Ideal for work, meetings, or relaxation",
      icon: "🌸"
    }
  ];

  return (
    <section id="about" className="relative bg-gradient-to-br from-cafe-cream via-white to-sage-light/20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-forest-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-sage-light rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32">
        <div className="text-center mb-12 lg:mb-20 fade-in">
          <div className="inline-block">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-forest-primary mb-4 lg:mb-6 leading-tight">
              About
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-teal-accent mt-2">
                HOPIN PATIO
              </span>
            </h2>
            <div className="w-16 h-1 sm:w-20 sm:h-1 bg-gradient-to-r from-teal-accent to-forest-primary mx-auto mb-6 lg:mb-8 rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-nature-dark/80 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Discover our story of passion, quality, and exceptional coffee experiences in our urban oasis
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 lg:mb-20">
          <div className="lg:col-span-7 space-y-6 lg:space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 luxury-shadow-lg relative overflow-hidden hover-card fade-in stagger-1">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-sage-light/20 to-transparent rounded-bl-full"></div>
              
              <div className="relative">
                <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 bg-forest-primary text-white text-sm font-medium rounded-full mb-4 lg:mb-6">
                  Our Story
                </span>
                
                <div className="space-y-4 lg:space-y-6 text-nature-dark/80">
                  <p className="text-base sm:text-lg leading-relaxed">
                    Founded with a passion for exceptional coffee and warm hospitality, HOPIN PATIO 
                    has been serving the community with premium coffee experiences since our inception.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Our elegant patio setting provides the perfect atmosphere for both intimate 
                    conversations and productive work sessions, all while enjoying our carefully 
                    curated selection of artisan coffees and fresh pastries.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    We believe that great coffee brings people together, and our mission is to 
                    create memorable moments for every guest who walks through our doors.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`btn-hover px-4 py-2 sm:px-6 sm:py-3 min-h-[44px] rounded-full font-medium text-sm sm:text-base fade-in stagger-${Math.min(index + 2, 6)} ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-forest-primary to-teal-accent text-white shadow-lg'
                      : 'bg-white/60 text-nature-dark/70 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            <div className="relative group hover-image fade-in stagger-3">
              <div className="absolute inset-0 bg-gradient-to-tr from-forest-primary/20 to-teal-accent/20 rounded-2xl rotate-3 transform transition-transform duration-500 group-hover:rotate-6"></div>
              <img 
                src="/images/hopin_interior1.jpg" 
                alt="HOPIN PATIO Interior"
                className="relative rounded-2xl w-full h-48 sm:h-56 lg:h-80 object-cover shadow-2xl"
              />
            </div>

            <div className="relative -ml-4 sm:-ml-8 lg:-ml-16 group hover-image fade-in stagger-4">
              <div className="absolute inset-0 bg-gradient-to-bl from-sage-light/30 to-forest-primary/10 rounded-2xl -rotate-3 transform transition-transform duration-500 group-hover:-rotate-6"></div>
              <img 
                src="/images/hopin_food1.jpg" 
                alt="Fresh Coffee and Pastries"
                className="relative rounded-2xl w-full h-40 sm:h-48 lg:h-56 object-cover shadow-xl transform transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-forest-primary to-teal-accent rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-8 lg:mb-12 text-center">
              Why Choose HOPIN PATIO?
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: "🌱",
                  title: "Ethically Sourced",
                  description: "Premium coffee beans from sustainable farms",
                  highlight: true
                },
                {
                  icon: "🏡",
                  title: "Beautiful Patio",
                  description: "Perfect outdoor setting with comfortable seating"
                },
                {
                  icon: "🍞",
                  title: "Fresh & Local",
                  description: "Daily baked pastries from local artisans"
                },
                {
                  icon: "👥",
                  title: "Expert Staff",
                  description: "Friendly baristas passionate about coffee"
                },
                {
                  icon: "💻",
                  title: "Work Friendly",
                  description: "High-speed WiFi and power outlets available"
                },
                {
                  icon: "🌺",
                  title: "Relaxing Ambiance",
                  description: "Peaceful environment for focus and conversation"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer touch-manipulation active:scale-95 ${
                    item.highlight ? 'ring-2 ring-white/50' : ''
                  }`}
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{item.icon}</div>
                  <h4 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 min-h-[48px] bg-gradient-to-r from-sage-light to-teal-accent text-forest-primary font-bold rounded-full hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer touch-manipulation text-sm sm:text-base">
            <span>Experience the Difference</span>
            <span className="text-lg sm:text-xl">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;