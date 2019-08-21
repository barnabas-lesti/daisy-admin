// import faker from 'faker';

// const fakeUser = {
//   email: faker.internet.email(),
//   password: faker.internet.password(),
//   fullName: faker.name.findName(),
// };

describe('Forgot password', () => {
  before(() => {
    cy.visit('/en/forgot-password');
  });

  it('Email form should prompt errors when field validation requirements are not met', () => {
  });

  it('Email form should send a password reset email to the given address', () => {
  });

  it('By clicking on the link in the email the user navigated back to this page where they can provide a new password', () => {
  });

  it('Password form should prompt errors when field validation requirements are not met', () => {
  });

  it('Entering valid information the users password should be changed', () => {
  });
});
