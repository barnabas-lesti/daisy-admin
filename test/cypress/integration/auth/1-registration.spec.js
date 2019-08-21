describe('Registration', () => {
  before(() => {
    cy.visit('/en/register');
  });

  it('Form should validate the fields and show error messages', () => {
    cy.get('form').submit();
    cy.contains(/full name.*required/i);
    cy.contains(/email.*required/i);
    cy.contains(/password.*required/i);
    cy.contains(/password confirmation.*required/i);

    cy.get('input[name="fullName"]').type('Yin');
    cy.contains(/full name.*between/i);
    cy.get('input[name="email"]').type('not_valid_email.com');
    cy.contains(/email.*invalid/i);
    cy.get('input[name="password"]').type('short');
    cy.contains(/password.*between/i);
    cy.get('input[name="passwordConfirmation"]').type('shorty');
    cy.contains(/passwords.*match/i);
  });

  it('Form should send a registration email to the given address', () => {
    cy.get('input[name="fullName"]').type('{selectall}Yin Yoo');
    cy.get('input[name="email"]').type('{selectall}yin.yoo@mail.com');
    cy.get('input[name="password"]').type('{selectall}abcd1234');
    cy.get('input[name="passwordConfirmation"]').type('{selectall}abcd1234{enter}');
    cy.contains(/registration.*email.*sent/i);
  });

  it('By clicking on the link in the email the user should be registered', () => {
    cy.visit(`/api/test/temp-file?path=email/${'yin.yoo@mail.com'}_registration_en.html`);
    cy.get('a[href]')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href')
      .and('include', '/register?token=');
    // cy.url().should('include', '/register?token=');
  });

  it('User should not be able to register with an email that already exists', () => {
  });

  it('Clicking on the sign in link the user should be navigated to the sign in page', () => {
  });
});
