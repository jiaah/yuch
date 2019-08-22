// <reference types="cypress" />;

describe('user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9080');
  });

  it('can visit login app', () => {
    cy.contains('로그인').click();
    cy.url().should('include', 'login');
    cy.get('[data-testid=username]').type('yuchung');
    cy.get('[data-testid=password]').type('yuchung1234');
    cy.get('button[type=submit]').click();

    cy.contains('로그아웃');
  });
});
