import React, { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const stickyNavOffset = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const adjustedScrollPosition = elementPosition + window.pageYOffset - stickyNavOffset;

      window.scrollTo({
        top: adjustedScrollPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'menu', 'gallery', 'contact'];
      const currentScrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentScrollPosition >= offsetTop && currentScrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' }
  ];

  const getNavLinkClasses = (sectionId) => {
    const isActive = activeSection === sectionId;
    const baseClasses = "px-4 py-2 min-h-[44px] rounded-lg font-medium transition-all duration-300 touch-manipulation hover-lift nav-link";
    const activeClasses = isActive 
      ? "bg-teal-accent text-white shadow-lg" 
      : "text-forest-primary hover:bg-sage-light hover:text-forest-primary";
    return `${baseClasses} ${activeClasses}`;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md border-b border-sage-light/30' 
        : 'bg-white shadow-sm border-b border-sage-light/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-forest-primary to-teal-accent bg-clip-text text-transparent">
              HOPIN PATIO CAFE
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={getNavLinkClasses(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="btn-hover p-4 min-h-[48px] min-w-[48px] rounded-lg text-forest-primary hover:bg-sage-light touch-manipulation"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? 'max-h-screen' : 'max-h-0'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white shadow-xl border-t border-sage-light/20 max-h-[70vh] overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`w-full text-left px-4 py-4 min-h-[48px] rounded-lg font-medium transition-all duration-200 touch-manipulation hover-lift ${
                activeSection === link.id
                  ? 'bg-teal-accent text-white shadow-md'
                  : 'text-forest-primary hover:bg-sage-light hover:text-forest-primary'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;