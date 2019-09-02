describe('forgot auth pages', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  context('forgot username', () => {
    beforeEach(() => {
      cy.contains('아이디 찾기').click();
      cy.server();
    });

    it('can visit forgot username page', () => {
      cy.url().should('include', '/auth/forgot?value=username');
      cy.contains('연락처');
    });

    it('renders a found username page from submit success', () => {
      const contactNoText = '010-2200-0087';
      cy.get(`[data-testid="contactNo"]`)
        .type(contactNoText)
        .should('have.value', contactNoText);

      cy.contains('계속하기').click();
      cy.route('POST', '/auth/forgot/username/contact', {
        contactNo: contactNoText,
      });
      cy.contains('아이디 찾기가 완료');
    });

    it('display an error message from submit failure', () => {
      const contactNoText = '010-2929-2029';
      cy.get(`[data-testid="contactNo"]`)
        .type(contactNoText)
        .should('have.value', contactNoText);

      cy.contains('계속하기').click();
      cy.route({
        url: '/api/auth/forgot/username/contact',
        method: 'POST',
        status: 409,
        response: {},
      });
      cy.get('.error').should('be.visible');
    });

    it('renders a form with email option on email button click & submission success', () => {
      cy.get(`[data-testid="email-forgot"]`).click();
      cy.get(`[data-testid="email"]`).should('have.value', '');

      const emailText = 'yuch@hanmail.net';
      cy.get(`[data-testid="email"]`)
        .type(emailText)
        .should('have.value', emailText);

      cy.contains('계속하기').click();
      cy.route('POST', '/api/auth/forgot/username/email', { email: emailText });
      cy.contains('아이디 찾기가 완료');
    });

    it('submission failure with email option', () => {
      cy.get(`[data-testid="email-forgot"]`).click();

      const emailText = 't@hanmail.net';
      cy.get(`[data-testid="email"]`)
        .type(emailText)
        .should('have.value', emailText);

      cy.contains('계속하기').click();
      cy.route({
        url: '/auth/forgot/username/email',
        method: 'POST',
        status: 409,
        response: {},
      });
      cy.get('.error').should('be.visible');
    });
  });

  context('forgot password', () => {
    beforeEach(() => {
      cy.contains('비밀번호 찾기').click();
      cy.server();
    });

    it('can visit forgot password page', () => {
      cy.url().should('include', '/auth/forgot?value=password');
      cy.contains('계속하기');
    });

    it('submission success', () => {
      const usernameText = 'yuch';
      const emailText = 'yuch@hanmail.net';
      cy.get(`[data-testid="username"]`)
        .type(usernameText)
        .should('have.value', usernameText);
      cy.get(`[data-testid="email"]`)
        .type(emailText)
        .should('have.value', emailText);
      cy.contains('계속하기').click();
      cy.route('POST', '/auth/forgot/password', {
        username: usernameText,
        email: emailText,
      });
      cy.contains('성공적으로 전송되었습니다');
    });

    it('submission failure', () => {
      const usernameText = 'incorrectusername';
      const emailText = 'yuch12@hanmail.net';
      cy.get(`[data-testid="username"]`)
        .type(usernameText)
        .should('have.value', usernameText);
      cy.get(`[data-testid="email"]`)
        .type(emailText)
        .should('have.value', emailText);
      cy.contains('계속하기').click();
      cy.route({
        url: '/auth/forgot/password',
        method: 'POST',
        status: 409,
        response: {},
      });
      cy.get('.error').should('be.visible');
    });
  });
});
