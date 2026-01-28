const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');

describe('User Model', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('User Creation', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890'
      };

      const user = await User.create(userData);

      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.phone).toBe(userData.phone);
      expect(user.password).not.toBe(userData.password);
      expect(user.role).toBe('customer');
    });

    it('should hash password before saving', async () => {
      const password = 'password123';
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password,
        phone: '+1234567890'
      };

      const user = await User.create(userData);
      const isPasswordHashed = await bcrypt.compare(password, user.password);

      expect(isPasswordHashed).toBe(true);
      expect(user.password).not.toBe(password);
    });

    it('should validate email format', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123',
        phone: '+1234567890'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should enforce unique email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890'
      };

      await User.create(userData);

      const duplicateUser = {
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password456',
        phone: '+0987654321'
      };

      await expect(User.create(duplicateUser)).rejects.toThrow();
    });

    it('should accept different user roles', async () => {
      const adminData = {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      };

      const staffData = {
        name: 'Staff User',
        email: 'staff@example.com',
        password: 'password123',
        role: 'staff'
      };

      const admin = await User.create(adminData);
      const staff = await User.create(staffData);

      expect(admin.role).toBe('admin');
      expect(staff.role).toBe('staff');
    });
  });

  describe('User Methods', () => {
    let user;

    beforeEach(async () => {
      user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890'
      });
    });

    it('should compare password correctly', async () => {
      const isMatch = await user.comparePassword('password123');
      const isNotMatch = await user.comparePassword('wrongpassword');

      expect(isMatch).toBe(true);
      expect(isNotMatch).toBe(false);
    });

    it('should generate auth tokens', async () => {
      const tokens = user.getAuthTokens();

      expect(tokens.accessToken).toBeDefined();
      expect(tokens.refreshToken).toBeDefined();
      expect(typeof tokens.accessToken).toBe('string');
      expect(typeof tokens.refreshToken).toBe('string');
    });

    it('should transform user to JSON correctly', async () => {
      const userJSON = user.toJSON();

      expect(userJSON.id).toBeDefined();
      expect(userJSON.name).toBe(user.name);
      expect(userJSON.email).toBe(user.email);
      expect(userJSON.password).toBeUndefined();
      expect(userJSON.refreshTokens).toBeUndefined();
    });
  });

  describe('User Validation', () => {
    it('should require name', async () => {
      const userData = {
        email: 'john@example.com',
        password: 'password123',
        phone: '+1234567890'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should require email', async () => {
      const userData = {
        name: 'John Doe',
        password: 'password123',
        phone: '+1234567890'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should require password', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });

    it('should validate phone number format', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: 'invalid-phone'
      };

      await expect(User.create(userData)).rejects.toThrow();
    });
  });
});