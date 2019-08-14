import faker from 'faker';

const fakeUser = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  nickname: faker.name.findName(),
};

describe('/register', () => {
  before(() => {
    cy.visit('/test/register');
  });

  it('should display errors for required fields when submit', () => {
    cy.get('form').submit();
    // cy.get('[name="nickname"]').should('have.class', 'error--text');
    cy.contains('errors.nickname.required');
    cy.contains('errors.email.required');
    cy.contains('errors.password.required');
    cy.contains('errors.passwordConfirmation.required');
    cy.contains('errors.nickname.required');
    cy.contains('errors.nickname.required');
    // cy.get('.qa-email').should('have.class', 'error--text');
    // cy.contains('Email is required');
    // cy.get('.qa-password').should('have.class', 'error--text');
    // cy.contains('Password is required');
    // cy.get('input[name="email"]').type(fakeUser.email);
    // cy.get('input[name="password"]').type(fakeUser.password);
    // cy.get('input[name="passwordConfirmation"]').type(fakeUser.password);
    // cy.get('form').submit();
  });
});
