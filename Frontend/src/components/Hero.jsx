import React, { useEffect, useState } from "react";
import { FiArrowDown, FiStar, FiAward, FiUsers } from "react-icons/fi";
import { aggregateRating } from "../data/reviews";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <FiStar
        key={index}
        className={
          index < rating ? "text-cafe-gold fill-cafe-gold" : "text-white/40"
        }
        size={16}
      />
    ));
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pb-12 overflow-hidden pt-24"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-secondary/20 to-accent/30 z-10"></div>
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501339847302-ac426a4c7c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>
      </div>

      {/* Floating Particles/Ambiance Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-teal-primary/30 rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-teal-secondary/20 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-2 h-2 bg-teal-accent/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-60 left-1/4 w-1 h-1 bg-teal-gold/50 rounded-full animate-particle"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-80 right-1/3 w-1 h-1 bg-aqua/40 rounded-full animate-particle"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute bottom-60 right-10 w-1 h-1 bg-coral/60 rounded-full animate-particle"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-1 h-1 bg-teal-primary/50 rounded-full animate-particle"
          style={{ animationDelay: "3.5s" }}
        ></div>
      </div>

      {/* Trust Indicators */}
      <div className="absolute top-24 left-4 md:left-8 z-20 hidden lg:block">
        <div className="bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 backdrop-blur-md rounded-lg p-4 border border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            {renderStars(Math.round(aggregateRating.average))}
          </div>
          <p className="text-white text-sm font-semibold">
            {aggregateRating.average} / 5.0
          </p>
          <p className="text-white/90 text-xs">
            {aggregateRating.totalReviews}+ Reviews
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
        <div className="mb-6 animate-slide-up">
          <span className="text-teal-primary text-sm md:text-base uppercase tracking-[0.3em] font-medium">
            Welcome to
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6 animate-bounce-in">
          HOPIN PATIO
        </h1>

        <div className="w-24 h-1 bg-cafe-teal mx-auto mb-8 animate-slide-up"></div>

        <p className="text-xl md:text-2xl lg:text-3xl text-neutral-dark mb-4 font-serif italic animate-slide-up drop-shadow-lg">
          Where Luxury Meets Flavor
        </p>

        <p className="text-base md:text-lg text-neutral-dark max-w-2xl mx-auto mb-8 animate-slide-up drop-shadow-lg">
          Experience the perfect blend of premium coffee, exquisite ambiance,
          and unparalleled service in our elegant patio setting.
        </p>

        {/* Top Review Snippet */}
        <div className="max-w-md mx-auto mb-12 bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 backdrop-blur-md rounded-lg p-4 border border-primary/25 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">{renderStars(5)}</div>
          <p className="text-neutral-dark text-sm italic mb-2">
            "Absolutely stunning atmosphere! The patio setting is perfect, and
            the coffee is exceptional."
          </p>
          <p className="text-neutral-dark text-xs">
            — Sarah Mitchell, Verified Customer
          </p>
        </div>

        {/* Multiple CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <a
            href="#menu"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 transform hover:scale-105 shadow-xl border-0"
          >
            View Menu
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 transform hover:scale-105 shadow-xl group"
          >
            <span className="flex items-center gap-2">
              Reserve a Table
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </a>
          <a
            href="tel:+1234567890"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold uppercase tracking-wider rounded-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Scroll Indicator
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/80 hover:text-cafe-teal transition-colors duration-300 animate-float"
        aria-label="Scroll down"
      >
        <FiArrowDown size={32} />
      </button> */}
    </section>
  );
};

export default Hero;
