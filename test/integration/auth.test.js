const http = require('../http');
const User = require('../../src/server/models/user');

describe('auth', () => {
  const testUser = { email: 'existing.user@test.com', password: 'valid123456' };

  beforeAll(async () => {
    await User.create(testUser);
  });
  
  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('POST /auth/sign-in', () => {
    test('should return with 400 if email or password is not provided', async () => {
      try {
        await http.post('/api/auth/sign-in', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 401 if user is not found', async () => {
      try {
        await http.post('/api/auth/sign-in', { email: 'foo.bar@test.com', password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 401 if password is invalid', async () => {
      try {
        await http.post('/api/auth/sign-in', { email: testUser.email, password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 200, send the "user" and "accessToken" if request is valid', async () => {
      try {
        const { status, data: { user, accessToken } } = await http.post('/api/auth/sign-in', { email: testUser.email, password, });
        expect(status).toBe(201);
        expect(user).toBeDefined();
        expect(accessToken).toBeDefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});