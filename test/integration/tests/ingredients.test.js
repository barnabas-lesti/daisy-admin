const jwt = require('jsonwebtoken');

const envConfig = require('../../../env.config');
const Ingredient = require('../../../src/server/models/ingredient');
const User = require('../../../src/server/models/user');
const { http, sortArrayOfObjects, createFakeUser, createFakeIngredient } = require('../utils');

let creatorUserDoc;
let ingredientDocs;

describe('ingredients', () => {
  beforeAll(async () => {
    const creatorUser = createFakeUser();
    creatorUserDoc = await User.create({
      ...creatorUser,
      passwordHash: await User.hashPassword(creatorUser.password),
    });

    const numberOfIngredients = 10;
    let ingredients = [];
    for (let i = 0; i < numberOfIngredients; i++) ingredients.push(createFakeIngredient(creatorUserDoc._id));

    ingredientDocs = await Ingredient.create(ingredients);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Ingredient.deleteMany({});
  });

  describe('PUT /api/ingredients', () => {
    test('should respond with 401 if user is not signed in', async () => {
      try {
        await http.put('/api/ingredients', {});
      } catch (error) {
        expect(error.response.status).toBe(401);
      }
    });
    test('should respond with 400 if "content.name" is not provided', async () => {
      try {
        const { content, ...newIngredient } = createFakeIngredient();
        await http.put('/api/ingredients', newIngredient, httpHeaders);
      } catch (error) {
        expect(error.response.status).toBe(400);
      }
    });
    test.todo('should respond with 200, create a new ingredient and return it');
  });

  describe('GET /api/ingredients', () => {
    test('should respond with 200 and return an array of ingredients', async () => {
      const { status, data } = await http.get('/api/ingredients');
      expect(status).toBe(200);
      expect(Array.isArray(data)).toEqual(true);
      expect(data.length).toEqual(ingredientDocs.length);
    });
  });

  describe('GET /api/ingredients/:_id', () => {
    test('should respond with 404 if ingredient is not found', async () => {
      try {
        await http.get(`/api/ingredients/not-a-valid-id-1234`);
      } catch (error) {
        expect(error.response.status).toBe(404);
      }
    });

    test('should respond with 200 and return an ingredient', async () => {
      const [ ingredientDoc ] = ingredientDocs;
      const { status, data } = await http.get(`/api/ingredients/${ingredientDoc._id}`);
      expect(status).toBe(200);
      expect(data).toBeDefined();
      expect(data.content.name).toEqual(ingredientDoc.content.name);
      expect(data.creator.nickname).toEqual(creatorUserDoc.nickname);
    });
  });

  describe('PATCH /api/ingredients/:_id', () => {
    test.todo('should respond with 401 if user is not signed in');
    test.todo('should respond with 404 if ingredient is not found');
    test.todo('should respond with 403 if signed in user is not the creator and is below admin rank');
    test.todo('should respond with 200 and update an ingredient');
  });

  describe('DELETE /api/ingredients/:_id', () => {
    test.todo('should respond with 401 if user is not signed in');
    test.todo('should respond with 404 if ingredient is not found');
    test.todo('should respond with 403 if signed in user is not the creator and is below admin rank');
    test.todo('should respond with 200 and delete an ingredient');
  });
});
