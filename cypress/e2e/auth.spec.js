// <reference types="cypress" />;
describe('login', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('로그인').click();
  });

  it('can visit login page & login submission failure', async () => {
    const usernameText = 'yuch';
    const passwordText = 'yuch2009ung';

    cy.url().should('include', 'login');
    cy.get(`[data-testid="username"]`)
      .type(usernameText)
      .should('have.value', usernameText);
    cy.get(`[data-testid="password"]`)
      .type(passwordText)
      .should('have.value', passwordText);
    cy.get('button[type=submit]').click();
    await cy.contains('계정').should('be.visible');
  });

  it('display error message when user login fails', () => {
    const usernameText = 'yuchung';
    const passwordText = 'yuchung1234';

    cy.get(`[data-testid="username"]`)
      .type(usernameText)
      .should('have.value', usernameText);
    cy.get(`[data-testid="password"]`)
      .type(passwordText)
      .should('have.value', passwordText);
    cy.get('button[type=submit]').click();
    cy.contains('아이디 또는 비밀번호 오류입니다.');
  });

  it('fails to access protected recource', () => {
    cy.visit('/user/account');
    cy.contains('로그인을 해주세요.');

    cy.visit('/admin/account');
    cy.contains('로그인을 해주세요.');
  });
});
