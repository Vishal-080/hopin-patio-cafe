import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/hopin_front.jpg')`,
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-0">
        <div className="relative max-w-4xl mx-auto">
          <div className="relative space-y-6 md:space-y-8 fade-in stagger-hero-title p-8 md:p-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-heading text-white leading-tight animate-element drop-shadow-lg">
              <span className="block">Welcome to</span>
              <span className="text-teal-accent block drop-shadow-xl">Hopin-Patio Cafē</span>
            </h1>
            
            <div className="relative p-6 max-w-3xl mx-auto">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 leading-relaxed drop-shadow-md">
                Experience premium coffee and exceptional ambiance in our elegant patio setting
              </p>
            </div>
            
            <div className="relative p-6 max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <button 
                  onClick={() => scrollToSection('menu')}
                  className="btn-advanced btn-pulse w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] bg-teal-accent text-white font-semibold rounded-full shadow-lg touch-manipulation text-base sm:text-lg"
                >
                  View Menu
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn-advanced w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] border-2 border-white text-white font-semibold rounded-full touch-manipulation text-base sm:text-lg bg-white/10 backdrop-blur-sm"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-forest-primary/20 to-transparent" />
      
      <div className="hidden sm:block absolute top-20 left-10 w-2 h-2 bg-teal-accent/20 rounded-full floating" />
      <div className="hidden sm:block absolute top-20 right-10 w-2 h-2 bg-sage-light/20 rounded-full floating" />
    </section>
  );
};

export default Hero;