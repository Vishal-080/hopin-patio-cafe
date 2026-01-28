# Frontend Integration Plan

## Current Frontend Analysis

Based on the existing React frontend, here's what needs to be integrated:

### Existing Components Ready for API Integration
1. **Contact.jsx** - Contact form and reservation form
2. **Menu.jsx** - Menu display with hardcoded data
3. **Reviews.jsx** - Customer reviews system
4. **Navigation.jsx** - User authentication state

### Current Data Sources
- **Static data**: All content is hardcoded in components
- **Reviews**: Stored in `/src/data/reviews.js`
- **Menu items**: Hardcoded in Menu.jsx component
- **Forms**: Basic HTML form submission with alerts

## Integration Strategy

### Phase 1: API Client Setup

#### 1.1 Install Required Dependencies
```bash
npm install axios react-query @tanstack/react-query
npm install @heroicons/react # for loading states, error icons
```

#### 1.2 Create API Client (`src/services/api.js`)
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Handle token refresh
          await this.refreshToken();
          // Retry the original request
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      
      const { accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      // Refresh failed, logout user
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

  // Auth methods
  async login(email, password) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async register(userData) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  // Menu methods
  async getMenuItems(categoryId = null) {
    const params = categoryId ? { category: categoryId } : {};
    const response = await this.client.get('/menu/items', { params });
    return response.data;
  }

  async getMenuCategories() {
    const response = await this.client.get('/menu/categories');
    return response.data;
  }

  // Order methods
  async createOrder(orderData) {
    const response = await this.client.post('/orders', orderData);
    return response.data;
  }

  async getUserOrders() {
    const response = await this.client.get('/orders');
    return response.data;
  }

  // Reservation methods
  async createReservation(reservationData) {
    const response = await this.client.post('/reservations', reservationData);
    return response.data;
  }

  async checkAvailability(date, partySize) {
    const response = await this.client.get('/reservations/availability', {
      params: { date, partySize }
    });
    return response.data;
  }

  async getUserReservations() {
    const response = await this.client.get('/reservations');
    return response.data;
  }
}

export default new ApiClient();
```

### Phase 2: State Management Setup

#### 2.1 React Query Configuration (`src/queries/queryClient.js`)
```javascript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

#### 2.2 Auth Context (`src/contexts/AuthContext.jsx`)
```javascript
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('accessToken'),
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const response = await api.getProfile();
          dispatch({
            type: 'SET_USER',
            payload: response.data,
          });
          dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login(email, password);
      const { user, token } = response.data;
      
      localStorage.setItem('accessToken', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (userData) => {
    try {
      const response = await api.register(userData);
      const { user, token } = response.data;
      
      localStorage.setItem('accessToken', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token },
      });
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Registration failed',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Phase 3: Component Updates

#### 3.1 Update Menu Component (`src/components/Menu.jsx`)
```javascript
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { Clock, Users } from '@heroicons/react/outline';

const Menu = () => {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['menu-categories'],
    queryFn: () => api.getMenuCategories(),
  });

  const { data: menuItems, isLoading: itemsLoading } = useQuery({
    queryKey: ['menu-items'],
    queryFn: () => api.getMenuItems(),
  });

  if (categoriesLoading || itemsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cafe-gold"></div>
      </div>
    );
  }

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted dishes made with the finest ingredients
          </p>
        </div>

        {categories?.data?.map((category) => (
          <div key={category.id} className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems?.data
                ?.filter((item) => item.category.id === category.id)
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <span className="text-cafe-gold font-bold">
                          ${item.price}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.description}
                      </p>
                      {item.preparationTime && (
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {item.preparationTime} min
                        </div>
                      )}
                      {item.dietaryInfo?.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {item.dietaryInfo.map((diet, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                            >
                              {diet.type}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
```

#### 3.2 Update Contact Component (`src/components/Contact.jsx`)
```javascript
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
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

  // Contact form mutation
  const contactMutation = useMutation({
    mutationFn: (contactData) => api.createContact(contactData),
    onSuccess: () => {
      alert('Thank you for your message! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    },
    onError: (error) => {
      alert(error.response?.data?.error?.message || 'Failed to send message');
    },
  });

  // Reservation mutation
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
          {/* Contact Form */}
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

          {/* Reservation Form */}
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

        {/* Contact Information */}
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
```

### Phase 4: Environment Variables

#### 4.1 Frontend `.env.example`
```bash
# API Configuration
VITE_API_URL=http://localhost:3001/api/v1

# Google Maps (for location display)
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA-MEASUREMENT_ID
VITE_FACEBOOK_PIXEL_ID=your-facebook-pixel-id
```

### Phase 5: Error Handling and Loading States

#### 5.1 Error Boundary Component (`src/components/ErrorBoundary.jsx`)
```javascript
import React from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">We're working to fix this issue.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-cafe-gold text-white px-6 py-2 rounded-lg hover:bg-cafe-gold/90"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## Integration Benefits

### 1. Real-time Data
- Dynamic menu updates without code changes
- Live order tracking
- Real-time reservation availability

### 2. User Experience Improvements
- Persistent user accounts
- Order history and reordering
- Personalized recommendations

### 3. Business Intelligence
- Customer behavior tracking
- Popular items analytics
- Peak time identification

### 4. Operational Efficiency
- Automated order processing
- Inventory management integration
- Staff performance tracking

## Migration Strategy

### Step 1: Backend Development
- Set up Node.js/Express server
- Implement database models
- Create API endpoints
- Set up authentication

### Step 2: Frontend Integration
- Install dependencies
- Set up API client
- Implement authentication context
- Update components one by one

### Step 3: Testing and Deployment
- Test all integrations
- Handle edge cases
- Deploy to production
- Monitor performance

This integration plan ensures a smooth transition from static content to a fully dynamic, data-driven cafe management system.