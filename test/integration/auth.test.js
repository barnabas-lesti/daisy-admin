const jwt = require('jsonwebtoken');

const http = require('../http');
const User = require('../../src/server/models/user');
const { users } = require('../mocks/users.json');
const [ mockUser ] = users;

describe('auth', () => {
  beforeAll(async () => {
    const userDocs = await Promise.all(users.map(async user => ({
      ...user,
      passwordHash: await User.hashPassword(user.password),
    })));
    await User.create(userDocs);
  });

  afterAll(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/sign-in', () => {
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
        await http.post('/api/auth/sign-in', { email: mockUser.email, password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 200, send the "user" and "accessToken" to the client if request is valid', async () => {
      try {
        const { email, password } = mockUser;
        const { status, data: { user, accessToken } } = await http.post('/api/auth/sign-in', { email, password });
        expect(status).toBe(200);
        expect(user).toBeDefined();
        expect(accessToken).toBeDefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });

  describe('POST /api/auth/verify-auth-token', () => {
    test('should return with 400 if token is not provided', async () => {
      try {
        await http.post('/api/auth/verify-auth-token', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 401 if token is invalid', async () => {
      try {
        const token = await jwt.sign({ email: 'some.bad.guy@fu.com'}, 'invalidSecret1234');
        await http.post('/api/auth/verify-auth-token', { token });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 200 if token is valid and return the user', async () => {
      try {
        const token = await User.createAccessToken(mockUser);
        const { status, data } = await http.post('/api/auth/verify-auth-token', { token });
        expect(status).toBe(200);
        expect(data).toBeDefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
});
