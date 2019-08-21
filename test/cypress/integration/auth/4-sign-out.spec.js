// import faker from 'faker';

// const fakeUser = {
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   fullName: faker.name.findName(),
// };

describe('Sign out', () => {
  before(() => {
    cy.visit('/en/sign-out');
  });

  it('User should be signed out by visiting this page and redirected', () => {
  });
});
