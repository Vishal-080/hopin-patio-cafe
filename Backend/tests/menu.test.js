const request = require('supertest');
const User = require('../src/models/User');
const MenuItem = require('../src/models/MenuItem');
const MenuCategory = require('../src/models/MenuCategory');
const app = require('../server');

describe('Menu Endpoints', () => {
  let authToken;
  let adminUser;
  let testCategory;
  let testMenuItem;

  beforeEach(async () => {
    await User.deleteMany({});
    await MenuItem.deleteMany({});
    await MenuCategory.deleteMany({});

    adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'hashedpassword',
      role: 'admin'
    });

    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'password123'
      });
    
    authToken = loginResponse.body.data.token;

    testCategory = await MenuCategory.create({
      name: 'Beverages',
      description: 'Hot and cold beverages',
      order: 1
    });

    testMenuItem = await MenuItem.create({
      name: 'Coffee',
      description: 'Freshly brewed coffee',
      price: 3.99,
      category: testCategory._id,
      dietaryInfo: [{ type: 'Vegetarian' }],
      preparationTime: 5,
      available: true,
      featured: false
    });
  });

  describe('GET /api/v1/menu/categories', () => {
    it('should get all menu categories', async () => {
      const response = await request(app)
        .get('/api/v1/menu/categories')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.categories).toHaveLength(1);
      expect(response.body.data.categories[0].name).toBe('Beverages');
    });

    it('should return empty array when no categories exist', async () => {
      await MenuCategory.deleteMany({});

      const response = await request(app)
        .get('/api/v1/menu/categories')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.categories).toHaveLength(0);
    });
  });

  describe('GET /api/v1/menu/items', () => {
    it('should get all menu items', async () => {
      const response = await request(app)
        .get('/api/v1/menu/items')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].name).toBe('Coffee');
    });

    it('should filter items by category', async () => {
      const response = await request(app)
        .get(`/api/v1/menu/items?category=${testCategory._id}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(1);
    });

    it('should filter only available items', async () => {
      await MenuItem.findByIdAndUpdate(testMenuItem._id, { available: false });

      const response = await request(app)
        .get('/api/v1/menu/items?available=true')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(0);
    });
  });

  describe('POST /api/v1/menu/items', () => {
    it('should create new menu item as admin', async () => {
      const newItem = {
        name: 'Tea',
        description: 'Freshly brewed tea',
        price: 2.99,
        category: testCategory._id,
        preparationTime: 3
      };

      const response = await request(app)
        .post('/api/v1/menu/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newItem)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.item.name).toBe(newItem.name);
      expect(response.body.data.item.price).toBe(newItem.price);
    });

    it('should return error for unauthorized user', async () => {
      const newItem = {
        name: 'Tea',
        description: 'Freshly brewed tea',
        price: 2.99,
        category: testCategory._id
      };

      const response = await request(app)
        .post('/api/v1/menu/items')
        .send(newItem)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return error for invalid data', async () => {
      const newItem = {
        name: '',
        price: -10,
        category: testCategory._id
      };

      const response = await request(app)
        .post('/api/v1/menu/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send(newItem)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/v1/menu/items/:id', () => {
    it('should update menu item as admin', async () => {
      const updateData = {
        name: 'Updated Coffee',
        price: 4.99
      };

      const response = await request(app)
        .put(`/api/v1/menu/items/${testMenuItem._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.item.name).toBe(updateData.name);
      expect(response.body.data.item.price).toBe(updateData.price);
    });

    it('should return error for non-existent item', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      const updateData = { name: 'Updated Coffee' };

      const response = await request(app)
        .put(`/api/v1/menu/items/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('ITEM_NOT_FOUND');
    });
  });

  describe('DELETE /api/v1/menu/items/:id', () => {
    it('should delete menu item as admin', async () => {
      const response = await request(app)
        .delete(`/api/v1/menu/items/${testMenuItem._id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted successfully');
    });

    it('should return error for non-existent item', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .delete(`/api/v1/menu/items/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe('ITEM_NOT_FOUND');
    });
  });
});