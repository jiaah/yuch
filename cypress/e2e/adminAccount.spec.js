describe('admin account', () => {
  beforeEach(() => {
    cy.login('admin');
  });

  it('displays a logout button', () => {
    expect(window.localStorage.getItem('token')).to.exist;
    expect(window.localStorage.getItem('refreshToken')).to.exist;
    cy.contains('로그아웃');
  });

  context('admin account page', () => {
    it('edits user account info', () => {
      cy.visit('/admin/account');
      cy.get(`[data-testid="companyName"]`)
        .clear()
        .type('유청');
      cy.get('button[type=submit]').click();
      cy.get('.success').should('be.visible');
    });

    // CypressError: No request ever occured
    it('display an error on failure', () => {
      cy.visit('/admin/account');
      const id = 'asdfasdf';

      cy.get('button[type=submit]')
        .click()
        .request({
          url: `api/admin/edit/${id}`,
          method: 'PATCH',
          status: 500,
          response: {},
        })
        .should('have.class', 'error');
    });

    // how to reset password change after testing.
    // otherwise it throw an error when login testing.
    it('changes password', () => {
      cy.visit('/admin/account');
      cy.get(`[data-testid="to-password-modal-btn"]`).as('pwdModalBtn');

      cy.get(`@pwdModalBtn`).click();

      cy.get(`[data-testid="password"]`).type('yuch2009ung');
      cy.get(`[data-testid="newPassword"]`).type('yuch2009ung');
      cy.get(`[data-testid="confirmPassword"]`).type('yuch2009ung');
      cy.get('button[type=submit]').click();
      cy.get('.success').should('be.visible');
    });
    it('closes password modal', () => {
      cy.visit('/admin/account');
      cy.get(`[data-testid="to-password-modal-btn"]`).as('pwdModalBtn');

      cy.get(`@pwdModalBtn`).click();
      cy.get('[data-testid="close-modal-btn"]').click();
      cy.get(`@pwdModalBtn`).should('be.visible');
    });
  });

  // how to reset token, refresh token after testing
  it('display an error when user has invalid refresh token & token', () => {
    // window.localStorage.setItem('token', 'asdfasfdasfd');
    // window.localStorage.setItem('refreshToken', '');
    // expect(window.localStorage.getItem('token')).to.be.a('asdfasfdasfd');
    // expect(window.localStorage.getItem('refreshToken')).to.be.a('');
    // cy.visit('/admin/account');
    // cy.get('.error').should('be.visible');
  });
});
