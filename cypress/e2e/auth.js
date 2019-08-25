// <reference types="cypress" />;

describe('user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9080');
  });

  it('can visit login page & display error message when user login fails', () => {
    cy.contains('로그인').click();
    cy.url().should('include', 'login');
    cy.get(`[data-testid="username"]`).type('yuch');
    cy.get(`[data-testid="password"]`).type('yuchung1234');
    cy.get('button[type=submit]').click();

    cy.contains('아이디 또는 비밀번호 오류입니다.');
  });
});
