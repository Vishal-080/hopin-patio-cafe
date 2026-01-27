import React from 'react'
import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: <FiInstagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <FiFacebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <FiTwitter size={20} />, href: '#', label: 'Twitter' },
  ]

  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-neutral-dark text-white py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-teal-primary mb-4">
              HOPIN PATIO
            </h3>
            <p className="text-white/70 mb-4 leading-relaxed">
              Where luxury meets flavor. Experience the perfect blend of premium
              coffee, exquisite ambiance, and unparalleled service.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-white/70 hover:text-teal-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a
                  href="mailto:info@hopinpatiocafe.com"
                  className="hover:text-teal-primary transition-colors duration-300"
                >
                  info@hopinpatiocafe.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="hover:text-primary transition-colors duration-300"
                >
                  (123) 456-7890
                </a>
              </li>
              <li>Monday - Sunday</li>
              <li>7:00 AM - 8:00 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p>
            © {currentYear} HOPIN PATIO Cafe. All rights reserved. |{' '}
            <a href="#" className="hover:text-teal-gold transition-colors duration-300">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-teal-gold transition-colors duration-300">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
