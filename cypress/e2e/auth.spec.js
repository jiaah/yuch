/* eslint-disable jest/no-focused-tests */
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

    // cy.server();
    // cy.route('POST', 'http://localhost:9080/auth/login', {
    //   username: usernameText,
    //   password: passwordText,
    // });
    // cy.request({
    //   method: 'POST',
    //   url: '/auth/login',
    //   body: {
    //     username: usernameText,
    //     password: passwordText,
    //   },
    // });
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

    cy.server();
    cy.route('POST', '/auth/login', {
      username: usernameText,
      password: passwordText,
    });

    cy.contains('아이디 또는 비밀번호 오류입니다.');
  });

  it('fails to access protected recource', () => {
    cy.server();
    cy.route({
      url: '/admin/account/rates',
      failOnStatusCode: false,
    })
      .its('status')
      .should('equal', 500);
  });
});
