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
      const contactNoText = '010-3306-0057';
      cy.get(`[data-testid="contactNo"]`)
        .type(contactNoText)
        .should('have.value', contactNoText);

      cy.contains('계속하기').click();
      cy.route('POST', '/auth/forgot/username/contact', {
        contactNo: contactNoText,
      });
      cy.contains('아이디 찾기가 완료되었습니다.');
    });

    it('display an error message from submit failure', () => {
      const contactNoText = '010-2929-2029';
      cy.get(`[data-testid="contactNo"]`)
        .type(contactNoText)
        .should('have.value', contactNoText);

      cy.contains('계속하기').click();
      cy.route({
        url: '/auth/forgot/username/contact',
        method: 'POST',
        status: 409,
        response: {},
      });
      cy.contains(
        '유청에 등록되어 있는 정보가 아닙니다. 다시 한번 확인해주세요.',
      );
    });

    it('renders a form with email option on email button click & submission success', () => {
      cy.get(`[data-testid="email-forgot"]`).click();
      cy.get(`[data-testid="email"]`).should('have.value', '');

      const emailText = 'sleket12@hanmail.net';
      cy.get(`[data-testid="email"]`)
        .type(emailText)
        .should('have.value', emailText);

      cy.contains('계속하기').click();
      cy.route('POST', '/auth/forgot/username/email', { email: emailText });
      cy.contains('아이디 찾기가 완료되었습니다.');
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
      cy.contains(
        '유청에 등록되어 있는 정보가 아닙니다. 다시 한번 확인해주세요.',
      );
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
      const emailText = 'sleket12@hanmail.net';
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

      cy.contains('인증코드가 성공적으로 전송되었습니다. ');
    });

    it('submission failure', () => {
      const usernameText = 'incorrectusername';
      const emailText = 'sleket12@hanmail.net';
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
      cy.contains('이메일을 보내는데 실패하였습니다.');
    });
  });
});
