const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const mongoose = require('mongoose');

describe('Authentication Tests', () => {
  beforeAll(async () => {
    // Clear the users collection before all tests
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const regularUserData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    role: 'user',
    contactNo: '1234567890',
    aadhaarNo: '123456789012',
    address: '123 Test Street',
    annualIncome: 50000,
    workType: 'Agriculture',
    state: 'Test State',
    district: 'Test District',
    dob: '1990-01-01'
  };

  const jobProviderData = {
    name: 'Test Provider',
    email: 'provider@example.com',
    password: 'password123',
    role: 'jobProvider',
    contactNo: '9876543210',
    address: '456 Provider Street',
    state: 'Test State',
    district: 'Test District'
  };

  const cscData = {
    name: 'Test CSC',
    email: 'csc@example.com',
    password: 'password123',
    role: 'csc',
    contactNo: '5555555555',
    address: '789 CSC Street',
    state: 'Test State',
    district: 'Test District'
  };

  describe('User Registration', () => {
    it('should register a regular user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(regularUserData);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('user');
    });

    it('should register a job provider', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(jobProviderData);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('jobProvider');
    });

    it('should register a CSC operator', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(cscData);
      
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('csc');
    });

    it('should not register a user with duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(regularUserData);
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register a user with duplicate contact number', async () => {
      const duplicateContactData = {
        ...regularUserData,
        email: 'different@example.com',
        aadhaarNo: '987654321012'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(duplicateContactData);
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should not register a regular user without Aadhaar number', async () => {
      const noAadhaarData = { ...regularUserData };
      delete noAadhaarData.aadhaarNo;
      noAadhaarData.email = 'noaadhaar@example.com';
      noAadhaarData.contactNo = '1111111111';

      const res = await request(app)
        .post('/api/auth/register')
        .send(noAadhaarData);
      
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('User Login', () => {
    it('should login a regular user', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: regularUserData.email,
          password: regularUserData.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('user');
    });

    it('should login a job provider', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: jobProviderData.email,
          password: jobProviderData.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('jobProvider');
    });

    it('should login a CSC operator', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: cscData.email,
          password: cscData.password
        });
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.role).toBe('csc');
    });
  });
}); 