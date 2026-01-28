/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Gradient Palette
        'primary': '#6366f1',      // Indigo
        'primary-dark': '#4f46e5', // Darker Indigo
        'primary-light': '#a5b4fc', // Light Indigo
        'secondary': '#ec4899',    // Pink
        'secondary-dark': '#db2777', // Darker Pink
        'secondary-light': '#f9a8d4', // Light Pink
        'accent': '#06b6d4',      // Cyan
        'accent-dark': '#0891b2', // Darker Cyan
        'accent-light': '#67e8f9', // Light Cyan
        'neutral': '#f8fafc',     // Slate-50
        'neutral-dark': '#0f172a', // Slate-900
        'neutral-mid': '#64748b',  // Slate-500
        'warm': '#fef3c7',        // Amber-100
        'warm-dark': '#92400e',   // Amber-800
        'glass': 'rgba(255,255,255,0.1)',
        'glass-dark': 'rgba(0,0,0,0.1)',
        
        // Cafe Theme Colors
        'cafe-gold': '#D4AF37',     // Gold accent
        'cafe-brown': '#8B4513',     // Rich brown
        'cafe-teal': '#14B8A6',     // Teal accent
        'cafe-dark': '#1F2937',     // Dark gray for text
        'cafe-cream': '#FFF8E7',     // Cream background
        'cafe-light': '#F3F4F6',     // Light gray for borders
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-down': 'slideDown 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
