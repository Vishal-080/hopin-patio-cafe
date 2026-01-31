import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setTouched(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validateField = (name, value) => {
    if (name === 'name') return value.trim().length >= 2;
    if (name === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (name === 'message') return value.trim().length >= 10;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);
    
    const isValid = Object.keys(formData).every(key => validateField(key, formData[key]));
    if (isValid) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
    }
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-light/20 via-cafe-cream to-teal-accent/10"></div>
      
      <div className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-forest-primary/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 sm:w-48 sm:h-48 rounded-full bg-teal-accent/10 blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-20 fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-forest-primary mb-4 lg:mb-6 tracking-tight animate-element">
            Find Your Way to Us
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 fade-in stagger-2">
            Whether you're planning a visit, have questions about our forest-inspired space, 
            or simply want to share your experience, we're here to listen
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 fade-in stagger-1">
            <div className="relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-forest-primary mb-6 lg:mb-8 flex items-center">
                <span className="w-1 h-6 sm:h-8 bg-teal-accent mr-3 sm:mr-4 rounded-full"></span>
                Visit Our Forest
              </h3>
              
              <div className="space-y-6 lg:space-y-8">
                {[
                  {
                    icon: '📍',
                    title: 'Location',
                    content: '123 Patio Street, Coffee City, CC 12345',
                    delay: 'delay-75'
                  },
                  {
                    icon: '📞',
                    title: 'Call Us',
                    content: '(555) 123-4567',
                    delay: 'delay-100'
                  },
                  {
                    icon: '✉️',
                    title: 'Email',
                    content: 'hello@hopinpatio.com',
                    delay: 'delay-150'
                  },
                  {
                    icon: '🌿',
                    title: 'Forest Hours',
                    content: (
                      <>
                        Monday - Friday: 7:00 AM - 8:00 PM<br />
                        Saturday - Sunday: 8:00 AM - 9:00 PM
                      </>
                    ),
                    delay: 'delay-200'
                  }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className={`group hover-lift fade-in stagger-${Math.min(index + 3, 6)}`}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-forest-primary text-base sm:text-lg mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 fade-in stagger-2">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl lg:shadow-2xl p-6 sm:p-8 lg:p-10 border border-sage-light/20 hover-card">
              <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-accent/20 to-transparent rounded-bl-2xl sm:rounded-bl-3xl"></div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-forest-primary mb-6 lg:mb-8">
                Leave a Message
              </h3>
              
              {submitted && (
                <div 
                  className="mb-6 p-4 bg-teal-accent/10 border border-teal-accent/30 rounded-2xl flex items-center space-x-3 animate-pulse"
                  role="alert"
                  aria-live="polite"
                >
                  <span className="text-xl sm:text-2xl" aria-hidden="true">🌱</span>
                  <p className="text-teal-accent font-medium text-sm sm:text-base">Message sent successfully! We'll respond within 24 hours.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-forest-primary mb-2">
                    Your Name <span className="text-teal-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[48px] rounded-xl sm:rounded-2xl border-2 bg-cafe-cream/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-accent/20 focus:border-teal-accent touch-manipulation ${
                      touched.name && !validateField('name', formData.name) 
                        ? 'border-red-400 bg-red-50' 
                        : touched.name && validateField('name', formData.name)
                        ? 'border-green-400 bg-green-50'
                        : 'border-sage-light/30 hover:border-sage-light/60'
                    }`}
                    placeholder="Enter your full name"
                    aria-required="true"
                    aria-describedby={touched.name && !validateField('name', formData.name) ? 'name-error' : null}
                    autoComplete="name"
                  />
                  {touched.name && !validateField('name', formData.name) && (
                    <p id="name-error" className="text-sm text-red-500 mt-1 flex items-center" role="alert">
                      <span className="mr-1" aria-hidden="true">⚠️</span> Name must be at least 2 characters
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-forest-primary mb-2">
                    Email Address <span className="text-teal-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[48px] rounded-xl sm:rounded-2xl border-2 bg-cafe-cream/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-accent/20 focus:border-teal-accent touch-manipulation ${
                      touched.email && !validateField('email', formData.email) 
                        ? 'border-red-400 bg-red-50' 
                        : touched.email && validateField('email', formData.email)
                        ? 'border-green-400 bg-green-50'
                        : 'border-sage-light/30 hover:border-sage-light/60'
                    }`}
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-describedby={touched.email && !validateField('email', formData.email) ? 'email-error' : null}
                    autoComplete="email"
                  />
                  {touched.email && !validateField('email', formData.email) && (
                    <p id="email-error" className="text-sm text-red-500 mt-1 flex items-center" role="alert">
                      <span className="mr-1" aria-hidden="true">⚠️</span> Please enter a valid email address
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-forest-primary mb-2">
                    Your Message <span className="text-teal-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={5}
                    className={`w-full px-4 py-3 sm:px-5 sm:py-4 min-h-[48px] rounded-xl sm:rounded-2xl border-2 bg-cafe-cream/50 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-teal-accent/20 focus:border-teal-accent resize-none touch-manipulation ${
                      touched.message && !validateField('message', formData.message) 
                        ? 'border-red-400 bg-red-50' 
                        : touched.message && validateField('message', formData.message)
                        ? 'border-green-400 bg-green-50'
                        : 'border-sage-light/30 hover:border-sage-light/60'
                    }`}
                    placeholder="Tell us what's on your mind..."
                    aria-required="true"
                    aria-describedby={touched.message && !validateField('message', formData.message) ? 'message-error' : null}
                  />
                  {touched.message && !validateField('message', formData.message) && (
                    <p id="message-error" className="text-sm text-red-500 mt-1 flex items-center" role="alert">
                      <span className="mr-1" aria-hidden="true">⚠️</span> Message must be at least 10 characters
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn-hover w-full px-6 py-3 sm:px-8 sm:py-4 min-h-[48px] bg-gradient-to-r from-forest-primary to-teal-accent text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg touch-manipulation"
                >
                  <span className="relative z-10 flex items-center justify-center text-base sm:text-lg">
                    Send Message
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;