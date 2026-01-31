import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0) {
      setIsValid(validateEmail(value));
    } else {
      setIsValid(null);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
        setIsValid(null);
      }, 3000);
    }
  };

  return (
    <section id="newsletter" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-forest-primary via-teal-accent/90 to-sage-light/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      <div className="absolute top-10 left-1/4 w-24 h-24 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-32 h-32 sm:w-60 sm:h-60 bg-cafe-cream/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="hidden sm:block absolute top-1/2 left-10 w-20 h-20 bg-teal-accent/30 rounded-full blur-2xl animate-bounce"></div>
      
      <div className="absolute inset-0 opacity-10">
        <div className="hidden sm:block absolute top-0 left-0 text-6xl sm:text-8xl rotate-12">🌿</div>
        <div className="hidden sm:block absolute top-20 right-10 text-4xl sm:text-6xl -rotate-12">🍃</div>
        <div className="absolute bottom-20 left-1/3 text-4xl sm:text-7xl rotate-45">🌱</div>
        <div className="absolute bottom-10 right-1/3 text-3xl sm:text-5xl -rotate-45">🌿</div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12 fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 animate-element">
            <span className="text-3xl sm:text-4xl">🌲</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 lg:mb-6 tracking-tight px-4">
            Join Our Forest Community
          </h3>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4 fade-in stagger-2">
            Receive seasonal updates, forest events, and exclusive offers that nurture your connection to nature
          </p>
        </div>

        {isSubscribed ? (
          <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 text-center scale-in animate-element" role="status" aria-live="polite">
            <div className="text-4xl sm:text-6xl mb-4" aria-hidden="true">🎉</div>
            <h4 className="text-xl sm:text-2xl font-bold text-forest-primary mb-2">
              Welcome to the Forest!
            </h4>
            <p className="text-gray-600 text-sm sm:text-base">
              Check your email for a special welcome gift from our garden
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto fade-in stagger-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-2 border border-white/20 hover-card">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className={`flex-1 px-4 py-3 sm:px-6 sm:py-4 min-h-[48px] bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 touch-manipulation ${
                    isValid === false ? 'border-2 border-red-400' : 
                    isValid === true ? 'border-2 border-green-400' : 
                    'border-2 border-transparent'
                  }`}
                  required
                  aria-label="Email address for newsletter subscription"
                  aria-invalid={isValid === false ? 'true' : 'false'}
                  aria-describedby={isValid === false ? 'email-error-newsletter' : null}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={!isValid && email.length > 0}
                  className="btn-hover px-6 py-3 sm:px-8 sm:py-4 min-h-[48px] bg-gradient-to-r from-white to-cafe-cream text-forest-primary font-bold rounded-xl sm:rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  <span className="relative z-10 flex items-center justify-center text-sm sm:text-base">
                    Subscribe
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </button>
              </div>
            </div>
            
            {email.length > 0 && isValid === false && (
              <p id="email-error-newsletter" className="text-white/80 text-sm mt-3 text-center flex items-center justify-center" role="alert">
                <span className="mr-2" aria-hidden="true">⚠️</span>
                Please enter a valid email address
              </p>
            )}
            
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-white/80 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌱</span>
                <span>No spam, just nature</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🔒</span>
                <span>Privacy protected</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌿</span>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;