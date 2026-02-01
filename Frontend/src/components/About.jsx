import React, { useState } from 'react';

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Premium Coffee",
      description: "Premium quality beans roasted to perfection",
      icon: "☕"
    },
    {
      title: "Patio Paradise", 
      description: "Beautiful outdoor setting with comfortable seating",
      icon: "🌿"
    },
    {
      title: "Pet Friendly",
      description: "Pet-friendly Cafe",
      icon: "🐾"
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
                Hopin-Patio Cafe
              </span>
            </h2>
            <div className="w-16 h-1 sm:w-20 sm:h-1 bg-gradient-to-r from-teal-accent to-forest-primary mx-auto mb-6 lg:mb-8 rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl text-nature-dark/80 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Discover our story of passion, quality, and exceptional coffee experiences in the heart of <b>Indore.</b>
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
                    Founded with a passion for exceptional Coffee and delicious Food.
                    <br/>
                    <br/>
                    <b>Hopin-Patio Cafe</b> has been serving the people of <b>Indore</b> with premium coffee experiences since our inception.
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed">
                    Our elegant patio setting provides the perfect atmosphere for both intimate 
                    conversations and productive work sessions, all while enjoying our <b>artisan Coffees</b> and <b>fresh Food.</b>
                  </p>
                  {/* <p className="text-base sm:text-lg leading-relaxed">
                    We believe that great coffee brings people together, and our mission is to 
                    create memorable moments for every guest who walks through our doors.
                  </p> */}
                </div>
              </div>
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
        <div className="flex justify-center items-center gap-2 sm:gap-3 w-full mb-8">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`btn-hover px-8 py-6 sm:px-4 sm:py-4 min-h-[44px] rounded-full font-medium text-sm sm:text-base transition-all duration-300 whitespace-nowrap transform hover:scale-105 ${
                    activeFeature === index
                      ? 'bg-gradient-to-r from-forest-primary to-teal-accent text-white shadow-lg scale-105'
                      : 'bg-white/60 text-nature-dark/70 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  <div className="mr-2">{feature.icon}</div>
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Active Feature Description */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden fade-in max-w-4xl mx-auto mb-8">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-teal-accent/20 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="flex items-center mb-4">
                  <span className="text-3xl sm:text-4xl mr-3">{features[activeFeature].icon}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-forest-primary">
                    {features[activeFeature].title}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-nature-dark/80 leading-relaxed">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>

        <div className="bg-gradient-to-r from-forest-primary to-teal-accent rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-8 lg:mb-12 text-center">
              Why Choose HOPIN PATIO?
            </h3>
            
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">{
                [{
                  icon: "🥗",
                  title: "Pure Vegetarian",
                  description: "Premium quality veggies from sustainable farms"
                },
                {
                  icon: "🐾",
                  title: "Pet Friendly",
                  description: "Pet-friendly Cafe"
                },
                {
                  icon: "🏡",
                  title: "Beautiful Patio",
                  description: "Perfect outdoor setting with comfortable seating"
                },
                {
                  icon: "👥",
                  title: "Expert Staff",
                  description: "Friendly baristas passionate about coffee"
                },
                {
                  icon: "🌺",
                  title: "Relaxing Ambiance",
                  description: "Peaceful vibes for focus and conversation"
                },
                {
                  icon: "💻",
                  title: "Work Friendly",
                  description: "High-speed WiFi and power outlets available"
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
      </div>
    </section>
  );
};

export default About;