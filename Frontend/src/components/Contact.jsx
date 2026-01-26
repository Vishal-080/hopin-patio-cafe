import React, { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiMessageCircle, FiCalendar } from 'react-icons/fi'

const Contact = () => {
  const contactInfo = [
    {
      icon: <FiMapPin size={24} />,
      title: 'Location',
      content: 'Visit us at our beautiful patio location',
      link: 'https://share.google/CWq1SYP6Yi9uWChQ8',
      linkText: 'View on Google Maps',
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Phone',
      content: 'Call us for reservations',
      link: 'tel:+1234567890',
      linkText: '(123) 456-7890',
    },
    {
      icon: <FiMail size={24} />,
      title: 'Email',
      content: 'Send us a message',
      link: 'mailto:info@hopinpatiocafe.com',
      linkText: 'info@hopinpatiocafe.com',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Hours',
      content: 'Monday - Sunday',
      link: null,
      linkText: '7:00 AM - 8:00 PM',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32 bg-cafe-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cafe-teal text-sm uppercase tracking-wider font-medium">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-cafe-dark mt-4 mb-6">
            Visit Us Today
          </h2>
          <div className="w-20 h-1 bg-cafe-teal mx-auto mb-6"></div>
          <p className="text-lg text-cafe-dark/70 max-w-2xl mx-auto">
            We'd love to welcome you to HOPIN PATIO Cafe. Reserve a table,
            ask a question, or simply drop by for an exceptional experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div>
            <div className="grid gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-cafe-teal flex-shrink-0 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-cafe-dark mb-2">
                        {info.title}
                      </h3>
                      <p className="text-cafe-dark/70 mb-2">{info.content}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-cafe-teal hover:text-cafe-brown font-medium transition-colors duration-300"
                        >
                          {info.linkText}
                        </a>
                      ) : (
                        <p className="text-cafe-dark font-medium">{info.linkText}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif font-semibold text-cafe-dark mb-4">
                Find Us
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133389887!2d-73.98811768459384!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HOPIN PATIO Cafe Location"
                ></iframe>
              </div>
              <a
                href="https://share.google/CWq1SYP6Yi9uWChQ8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-cafe-teal hover:text-cafe-brown font-medium transition-colors duration-300"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Contact Form & Reservation */}
          <div className="space-y-6">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="tel:+1234567890"
                onClick={() => {
                  if (typeof window !== 'undefined' && window.trackPhoneCall) {
                    window.trackPhoneCall()
                  }
                }}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-cafe-teal text-cafe-dark font-semibold rounded-lg hover:bg-cafe-brown hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                <FiPhone size={20} />
                Call Now
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-cafe-teal text-cafe-teal font-semibold rounded-lg hover:bg-cafe-cream transition-all duration-300"
              >
                <FiMessageCircle size={20} />
                WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <FiMessageCircle className="text-cafe-teal" size={24} />
                <h3 className="text-2xl font-serif font-semibold text-cafe-dark">
                  Send Us a Message
                </h3>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  // In production, integrate with analytics
                  if (typeof window !== 'undefined' && window.trackFormSubmission) {
                    window.trackFormSubmission('contact_form')
                  }
                  alert('Thank you! We will get back to you soon.')
                }}
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-cafe-gold text-cafe-dark font-semibold uppercase tracking-wider rounded-sm hover:bg-cafe-brown hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Reservation Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-6">
                <FiCalendar className="text-cafe-teal" size={24} />
                <h3 className="text-2xl font-serif font-semibold text-cafe-dark">
                  Make a Reservation
                </h3>
              </div>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault()
                  // In production, integrate with analytics
                  if (typeof window !== 'undefined' && window.trackReservation) {
                    window.trackReservation()
                  }
                  alert('Reservation request received! We will confirm shortly.')
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-date"
                      className="block text-cafe-dark font-medium mb-2"
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      id="res-date"
                      name="res-date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-time"
                      className="block text-cafe-dark font-medium mb-2"
                    >
                      Time *
                    </label>
                    <input
                      type="time"
                      id="res-time"
                      name="res-time"
                      required
                      className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="party-size"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Party Size *
                  </label>
                  <select
                    id="party-size"
                    name="party-size"
                    required
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select party size</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5">5 people</option>
                    <option value="6+">6+ people</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="special-occasion"
                    className="block text-cafe-dark font-medium mb-2"
                  >
                    Special Occasion / Notes
                  </label>
                  <textarea
                    id="special-occasion"
                    name="special-occasion"
                    rows="3"
                    className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Birthday, anniversary, dietary requirements, etc."
                  ></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="res-name"
                      className="block text-cafe-dark font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="res-name"
                      name="res-name"
                      required
                      className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-teal focus:border-transparent transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="res-phone"
                      className="block text-cafe-dark font-medium mb-2"
                    >
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="res-phone"
                      name="res-phone"
                      required
                      className="w-full px-4 py-3 border border-cafe-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold focus:border-transparent transition-all duration-300"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-cafe-gold text-cafe-dark font-semibold uppercase tracking-wider rounded-sm hover:bg-cafe-brown hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Reserve Table
                </button>
              </form>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://share.google/CWq1SYP6Yi9uWChQ8"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-8 py-4 bg-white border-2 border-cafe-gold text-cafe-gold font-semibold uppercase tracking-wider rounded-lg hover:bg-cafe-gold hover:text-white transition-all duration-300 text-center"
            >
              <FiMapPin className="inline mr-2" size={20} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
