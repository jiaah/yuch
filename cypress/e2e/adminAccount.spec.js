describe('admin account', () => {
  beforeEach(() => {
    cy.login('admin');
  });
  it('visits accout page', () => {
    expect(window.localStorage.getItem('token')).to.exist;
    cy.contains('로그아웃');
  });

  context('admin account page', () => {
    beforeEach(() => {
      cy.visit('/admin/account');
      cy.get(`[data-testid="to-password-modal-btn"]`).as('pwdModalBtn');
    });
    it('edits user account info', () => {
      cy.get(`[data-testid="companyName"]`)
        .clear()
        .type('유청');
      cy.get('button[type=submit]').click();
      cy.get('.success').should('be.visible');
    });

    it('change password', () => {
      cy.get(`@pwdModalBtn`).click();

      cy.get(`[data-testid="password"]`).type('yuch2009ung');
      cy.get(`[data-testid="newPassword"]`).type('yuch2009ung');
      cy.get(`[data-testid="confirmPassword"]`).type('yuch2009ung');
      cy.get('button[type=submit]').click();
      cy.get('.success').should('be.visible');
    });
    it('cancels password change', () => {
      cy.get(`@pwdModalBtn`).click();

      cy.get('[data-testid="close-modal-btn"]').click();
      cy.get(`@pwdModalBtn`).should('be.visible');
    });
  });

  context('bank account page', () => {
    it('renders bank accounts list', () => {
      cy.seedAndVisitBankAccountPage();
      cy.get('[data-testid="bank-account--tablerow"]').should('have.length', 3);
    });
    it('displays an error on bank accounts list failure', () => {
      cy.server();
      cy.route({
        url: '/api/admin/bankaccount',
        method: 'GET',
        status: 500,
        response: {},
      });
      cy.visit('/admin/account/bank');
      cy.get('[data-testid="bank-account--tablerow"]').should('not.exist');
      cy.get('.error').should('be.visible');
    });
  });
});
