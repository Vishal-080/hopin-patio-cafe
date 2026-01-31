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
    <section id="home" className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-element"
          data-parallax="0.3"
          style={{
            backgroundImage: `url('/images/hopin_front.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-primary/90 via-teal-accent/50 to-forest-primary" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-primary/30 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 md:py-0">
        <div className="space-y-6 md:space-y-8 fade-in stagger-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight px-2 animate-element">
            Welcome to{' '}
            <span className="text-teal-accent block sm:inline mt-2 sm:mt-0">HOPIN PATIO</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-sage-light/90 max-w-2xl mx-auto leading-relaxed fade-in stagger-2 px-4">
            Experience premium coffee and exceptional ambiance in our elegant patio setting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center fade-in stagger-3 px-4">
            <button 
              onClick={() => scrollToSection('menu')}
              className="btn-hover w-full sm:w-auto px-8 py-4 min-h-[48px] bg-teal-accent text-white font-semibold rounded-full shadow-lg touch-manipulation text-lg"
            >
              View Menu
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="btn-hover w-full sm:w-auto px-8 py-4 min-h-[48px] border-2 border-sage-light text-sage-light font-semibold rounded-full touch-manipulation text-lg"
            >
              Reserve Table
            </button>
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