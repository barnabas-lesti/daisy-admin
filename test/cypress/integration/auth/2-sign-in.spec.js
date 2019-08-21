// import faker from 'faker';

// const fakeUser = {
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   fullName: faker.name.findName(),
// };

describe('Sign in', () => {
  before(() => {
    cy.visit('/en/sign-in');
  });

  it('Form should prompt errors when field validation requirements are not met', () => {
  });

  it('Form should show an error when credentials are invalid', () => {
  });

  it('User should be signed in if credentials are valid', () => {
  });

  it('If "ref" is present the user should be redirected to the matching route after signing in', () => {
  });

  it('Clicking on the registration link the user should be navigated to the registration page', () => {
  });

  it('Clicking on the forgot password link the user should be navigated to the forgot password page', () => {
  });
});
