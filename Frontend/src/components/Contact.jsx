import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [reservationForm, setReservationForm] = useState({
    date: '',
    time: '',
    partySize: '',
    specialRequests: '',
  });

  const contactMutation = useMutation({
    mutationFn: (contactData) => api.createContact && api.createContact(contactData),
    onSuccess: () => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    },
    onError: (error) => {
      alert(error.response?.data?.error?.message || 'Failed to send message');
    },
  });

  const reservationMutation = useMutation({
    mutationFn: (reservationData) => api.createReservation(reservationData),
    onSuccess: () => {
      alert('Reservation request submitted! We\'ll confirm shortly.');
      setReservationForm({ date: '', time: '', partySize: '', specialRequests: '' });
    },
    onError: (error) => {
      alert(error.response?.data?.error?.message || 'Failed to submit reservation');
    },
  });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    reservationMutation.mutate(reservationForm);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to make a reservation? We'd love to hear from you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                  required
                />
              </div>
              <input
                type="tel"
                placeholder="Your Phone"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                required
              />
              <button
                type="submit"
                disabled={contactMutation.isLoading}
                className="w-full bg-cafe-gold text-white py-3 rounded-lg font-semibold hover:bg-cafe-gold/90 transition-colors disabled:opacity-50"
              >
                {contactMutation.isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Make a Reservation</h3>
            <form onSubmit={handleReservationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="date"
                  value={reservationForm.date}
                  onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                  required
                />
                <input
                  type="time"
                  value={reservationForm.time}
                  onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                  required
                />
                <select
                  value={reservationForm.partySize}
                  onChange={(e) => setReservationForm({ ...reservationForm, partySize: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
                  required
                >
                  <option value="">Party Size</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Special Requests (optional)"
                rows={3}
                value={reservationForm.specialRequests}
                onChange={(e) => setReservationForm({ ...reservationForm, specialRequests: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-gold"
              />
              <button
                type="submit"
                disabled={reservationMutation.isLoading}
                className="w-full bg-cafe-teal text-white py-3 rounded-lg font-semibold hover:bg-cafe-teal/90 transition-colors disabled:opacity-50"
              >
                {reservationMutation.isLoading ? 'Submitting...' : 'Request Reservation'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <MapPinIcon className="h-12 w-12 text-cafe-gold mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Location</h4>
            <p className="text-gray-600">123 Cafe Street<br />Coffee City, CC 12345</p>
          </div>
          <div className="text-center">
<PhoneIcon className="h-12 w-12 text-cafe-gold mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Phone</h4>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div className="text-center">
<EnvelopeIcon className="h-12 w-12 text-cafe-gold mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Email</h4>
            <p className="text-gray-600">hello@yourcafe.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;