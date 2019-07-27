const jwt = require('jsonwebtoken');

const http = require('../http');
const { users } = require('../mocks/users.json');
const [ mockUser ] = users;

const User = require('../../../src/server/models/user');

describe('users', () => {
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

  describe('PUT /api/users', () => {
    test.todo('should ...');
  });
});
