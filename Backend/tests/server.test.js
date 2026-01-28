const request = require('supertest');
const app = require('../server');

describe('Health Check and Basic Server Tests', () => {
  describe('GET /health', () => {
    it('should return health check response', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Cafe Backend API is running');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.environment).toBeDefined();
    });
  });

  describe('404 Handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/api/v1/non-existent')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('NOT_FOUND');
      expect(response.body.error.message).toBe('API endpoint not found');
    });
  });

  describe('Rate Limiting', () => {
    it('should apply rate limiting to API endpoints', async () => {
      const promises = Array(150).fill().map(() =>
        request(app).get('/health')
      );

      const responses = await Promise.all(promises);
      const rateLimitedResponses = responses.filter(res => res.status === 429);
      
      expect(rateLimitedResponses.length).toBeGreaterThan(0);
      const rateLimitedResponse = rateLimitedResponses[0];
      expect(rateLimitedResponse.body.error.code).toBe('RATE_LIMIT_EXCEEDED');
    });
  });

  describe('CORS', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });

  describe('Security Headers', () => {
    it('should include security headers', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.headers['x-content-type-options']).toBe('nosniff');
      expect(response.headers['x-frame-options']).toBeDefined();
      expect(response.headers['x-xss-protection']).toBeDefined();
    });
  });
});