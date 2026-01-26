# HOPIN PATIO Cafe - Luxury Website

A luxurious, high-converting website for HOPIN PATIO Cafe built with React, Tailwind CSS, and modern web technologies.

## Features

- 🎨 **Luxurious Design**: Elegant gold accents, premium typography, and sophisticated color palette
- 📱 **Fully Responsive**: Beautiful on all devices - desktop, tablet, and mobile
- ⚡ **High Performance**: Built with Vite for lightning-fast load times
- 🎭 **Smooth Animations**: Subtle animations and transitions for a premium feel
- 🎯 **High Converting**: Optimized for conversions with clear CTAs and compelling content

## Tech Stack

- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
hopinpatiocafe/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Menu.jsx
│   │   ├── Reviews.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Customization

### Colors

The color scheme can be customized in `tailwind.config.js`:

- `cafe-gold`: Primary accent color (#D4AF37)
- `cafe-dark`: Dark text/background (#1A1A1A)
- `cafe-teal`: Light background (#007F7C)
- `cafe-brown`: Secondary accent (#8B6F47)
- `cafe-light`: Light borders (#E8E0D4)

### Content

Update the content in each component file:
- Menu items: `src/components/Menu.jsx`
- Reviews: `src/data/reviews.js` - Update with actual Google Reviews
- Contact information: `src/components/Contact.jsx`
- About section: `src/components/About.jsx`
- Google Reviews: `src/components/GoogleReviews.jsx` uses data from `src/data/reviews.js`

### Updating Google Reviews

To update reviews with actual Google Reviews data:

1. Open `src/data/reviews.js`
2. Replace the placeholder reviews with actual reviews from Google
3. Update the `aggregateRating` object with real rating data
4. The reviews will automatically appear in both the Reviews and GoogleReviews components

## Features Overview

### Navigation
- Fixed navigation bar with smooth scroll
- Mobile-responsive hamburger menu
- Transparent background that becomes solid on scroll

### Hero Section
- Full-screen hero with stunning background image
- Compelling headline and call-to-action buttons
- Smooth scroll indicator

### About Section
- Brand story and values
- Feature highlights with icons
- Beautiful image showcase

### Menu Section
- Categorized menu items
- Featured items highlighted
- Responsive grid layout

### Reviews Section
- Customer testimonials
- Star ratings
- Link to Google Reviews

### Contact Section
- Contact information cards
- Interactive contact form
- Embedded Google Maps

### Footer
- Social media links
- Quick navigation
- Contact information

## Performance Optimization

- Optimized images (consider using WebP format)
- Lazy loading for images
- Code splitting with React
- Minified CSS and JavaScript in production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.
