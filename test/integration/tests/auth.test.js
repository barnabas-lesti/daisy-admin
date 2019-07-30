const path = require('path');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');

const http = require('../http');
const { users } = require('../mocks/users.json');
const [ mockUser ] = users;
const envConfig = require('../../../env.config');

const User = require('../../../src/server/models/user');

const EMAIL_FOLDER_PATH = path.join(envConfig.TEMP_FOLDER_PATH, './email');

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

  describe('POST /api/auth/send-registration-email', () => {
    test('should return with 403 if registration is disabled', async () => {
      const originalEnvValue = envConfig.AUTH_REGISTRATION_DISABLED;
      envConfig.AUTH_REGISTRATION_DISABLED = true;
      try {
        await http.post('/api/auth/send-registration-email', {});
      } catch (error) {
        expect(error.response.status).toBe(403);
      }
      envConfig.AUTH_REGISTRATION_DISABLED = originalEnvValue;
    });

    test('should return with 400 if email is not provided', async () => {
      try {
        await http.post('/api/auth/send-registration-email', { nickname: 'nicky', password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 400 if nickname is not provided', async () => {
      try {
        await http.post('/api/auth/send-registration-email', { email: 'mail@test.com', password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 400 if password is not provided', async () => {
      try {
        await http.post('/api/auth/send-registration-email', { email: 'mail@test.com', nickname: 'nicky' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 200 and send an email in english to the given address with a registration token', async () => {
      try {
        const locale = 'en';
        await http.post('/api/auth/send-registration-email', { ...mockUser, locale });
        const content = await fs.readFile(path.join(EMAIL_FOLDER_PATH, `${mockUser.email}_registration_${locale}.html`), 'utf-8');
        expect(content).toMatch(/Locale: en/g);
        expect(content).toMatch(/<a[^>]* href="([^"]*)"/g);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
    test.todo('if locale is provided should return with 200 and send an email in given locale to the given address with a registration token');

    test.todo('should return with 404 if email could not be sent');
  });

  describe('POST /api/auth/register', () => {
    test.todo('should return with 403 if registration is disabled');

    test('should return with 400 if token is not provided', async () => {
      try {
        await http.post('/api/auth/register', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 401 if token is invalid', async () => {
      try {
        const token = await jwt.sign({ email: 'some.bad.guy@fu.com' }, 'invalidSecret1234');
        await http.post('/api/auth/register', { token });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test.todo('should return with 400 if token does not contain the email');
    test.todo('should return with 400 if token does not contain the password');
    test.todo('should return with 400 if token does not contain the nickname');
    test.todo('should return with 200 and register a new user');
  });

  describe('POST /api/auth/sign-in', () => {
    test('should return with 400 if email is not provided', async () => {
      try {
        await http.post('/api/auth/sign-in', { password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 400 if password is not provided', async () => {
      try {
        await http.post('/api/auth/sign-in', { email: 'test@test.com' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });


    test('should return with 401 if user was not found', async () => {
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

  describe('POST /api/auth/verify-access-token', () => {
    test('should return with 400 if token is not provided', async () => {
      try {
        await http.post('/api/auth/verify-access-token', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 401 if token is invalid', async () => {
      try {
        const token = await jwt.sign({ email: 'some.bad.guy@fu.com' }, 'invalidSecret1234');
        await http.post('/api/auth/verify-access-token', { token });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 401 if user was not found', async () => {
      try {
        const token = await User.createAccessToken({ email: 'not.existing.user@test.com' });
        await http.post('/api/auth/verify-access-token', { token });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test('should return with 200 if token is valid and return the user', async () => {
      try {
        const token = await User.createAccessToken(mockUser);
        const { status, data } = await http.post('/api/auth/verify-access-token', { token });
        expect(status).toBe(200);
        expect(data).toBeDefined();
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });

  describe('POST /api/auth/send-password-reset-email', () => {
    test('should return with 400 if email is not provided', async () => {
      try {
        await http.post('/api/auth/send-password-reset-email', {});
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test.todo('should return with 404 if user with given email is not registered');
    test.todo('should return with 200 and send an email to the given address with a reset token');
  });

  describe('POST /api/auth/reset-password', () => {
    test('should return with 400 if token is not provided', async () => {
      try {
        await http.post('/api/auth/reset-password', { password: '123456' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 400 if password is not provided', async () => {
      try {
        await http.post('/api/auth/reset-password', { token: 'yupThisIsAValidToken' });
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });

    test('should return with 401 if token is invalid', async () => {
      try {
        const token = await jwt.sign({ email: 'running.out.of.random.mails@hello.com' }, 'invalidSecret1234');
        await http.post('/api/auth/reset-password', { password: '123456', token });
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });

    test.todo('should return with 400 if token does not contain the email');
    test.todo('should return with 200 and update the users password');
  });
});
