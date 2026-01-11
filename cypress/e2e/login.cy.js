/**
 * - Login spec
 *   - should display login page correctly
 *   - should display helper text when email is empty
 *   - should display helper text when password is empty
 *   - should display notification when email and password are wrong
 *   - should display homepage and logout button when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('should display login page correctly', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('have.text', 'Sign In').should('be.visible');
  });

  it('should display helper text when email is empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('p')
      .contains(/^email is required$/i)
      .should('be.visible');
  });

  it('should display helper text when password is empty', () => {
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('button[type="submit"]').click();
    cy.get('p')
      .contains(/^password is required$/i)
      .should('be.visible');
  });

  it('should display notification when email and password are wrong', () => {
    cy.get('input[name="email"]').type('test@gmail.com');
    cy.get('input[name="password"]').type('asdasdasd');
    cy.get('button[type="submit"]').click();
    cy.get('div[id="notistack-snackbar"]')
      .contains(/^email or password is wrong$/i)
      .should('be.visible');
  });

  it('should display homepage and logout button when email and password are correct', () => {
    cy.get('input[name="email"]').type('strokes@email.com');
    cy.get('input[name="password"]').type('strokes');

    cy.get('button[type="submit"]').click();

    cy.get('h6')
      .contains(/^THREADS$/i)
      .should('be.visible');
    cy.get('a[href="/"]')
      .contains(/^Logout$/i)
      .should('be.visible');
  });
});
