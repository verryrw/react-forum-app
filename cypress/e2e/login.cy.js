/**
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email and password are wrong
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display threads page when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('input[type="email"]').type('verry@gmail.com');
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email or password is wrong', () => {
    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('input[type="email"]').type('verry@gmail.com');
    cy.get('input[type="password"]').type('salahin');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.on('window.alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display threads page when email and password are correct', () => {
    cy.get('input[type="email"]').type('af@af.com');
    cy.get('input[type="password"]').type('afafaf');

    cy.get('button')
      .contains(/^Login$/)
      .click();

    cy.get('button').contains('Logout').should('be.visible');
    cy.get('button[aria-label="button-add"]').should('be.visible');
  });
});
