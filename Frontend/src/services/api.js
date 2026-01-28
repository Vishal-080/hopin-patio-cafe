import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:300/api/v1';

class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

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

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.refreshToken();
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        this.logout();
        return;
      }

      const response = await this.client.post('/auth/refresh', {
        refreshToken,
      });

      const { accessToken } = response.data.data;
      localStorage.setItem('accessToken', accessToken);
    } catch (error) {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }

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

  async getMenuItems(categoryId = null) {
    const params = categoryId ? { category: categoryId } : {};
    const response = await this.client.get('/menu/items', { params });
    return response.data;
  }

  async getMenuCategories() {
    const response = await this.client.get('/menu/categories');
    return response.data;
  }

  async createOrder(orderData) {
    const response = await this.client.post('/orders', orderData);
    return response.data;
  }

  async getUserOrders(params = {}) {
    const response = await this.client.get('/orders', { params });
    return response.data;
  }

  async getOrderById(orderId) {
    const response = await this.client.get(`/orders/${orderId}`);
    return response.data;
  }

  async updateOrderStatus(orderId, status) {
    const response = await this.client.put(`/orders/${orderId}/status`, { status });
    return response.data;
  }

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

  async getUserReservations(params = {}) {
    const response = await this.client.get('/reservations', { params });
    return response.data;
  }

  async getInventoryItems(params = {}) {
    const response = await this.client.get('/inventory/items', { params });
    return response.data;
  }

  async createPaymentIntent(orderId, paymentMethod) {
    const response = await this.client.post('/payments/create-intent', {
      orderId,
      paymentMethod
    });
    return response.data;
  }

  async confirmPayment(orderId) {
    const response = await this.client.post(`/payments/${orderId}/confirm`);
    return response.data;
  }
}

export default new ApiClient();