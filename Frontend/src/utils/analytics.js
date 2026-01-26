// Analytics utility for tracking user interactions and conversions
// In production, integrate with Google Analytics, Facebook Pixel, etc.

export const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics 4 event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData)
  }

  // Facebook Pixel event tracking
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventData)
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', eventName, eventData)
  }
}

export const trackConversion = (conversionType, value = null) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
  })
}

export const trackCTA = (ctaName, location) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  })
}

export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName,
  })
  trackConversion('form_submission')
}

export const trackReservation = () => {
  trackEvent('reservation_request', {})
  trackConversion('reservation')
}

export const trackPhoneCall = () => {
  trackEvent('phone_call', {})
  trackConversion('phone_call')
}

export const trackMenuView = (category) => {
  trackEvent('menu_view', {
    category: category,
  })
}

export const trackReviewClick = () => {
  trackEvent('review_click', {})
}

// Initialize analytics (call this in main.jsx or App.jsx)
export const initAnalytics = () => {
  // Add heatmap-ready class names to interactive elements
  if (typeof document !== 'undefined') {
    // This would typically be handled by a heatmap service like Hotjar
    // For now, we'll just ensure elements have proper class names
    console.log('Analytics initialized')
  }
}
