describe('admin account page', () => {
  beforeEach(() => {
    cy.login('admin');
  });
  it('visits accout page', () => {
    expect(window.localStorage.getItem('token')).to.exist;
    cy.contains('로그아웃');
  });

  context('user account', () => {
    beforeEach(() => {
      cy.visit('/admin/account');
      cy.get(`[data-testid="to-password-modal-btn"]`).as('pwdModalBtn');
    });
    it('edits user account info', () => {
      cy.get(`[data-testid="contactNo"]`)
        .clear()
        .type('010-2020-3030');
      cy.get('button[type=submit]').click();
    });
    it('change password', () => {
      cy.get(`@pwdModalBtn`).click();

      cy.get(`[data-testid="password"]`).type('yuch2009ung');
      cy.get(`[data-testid="newPassword"]`).type('yuch2009ung');
      cy.get(`[data-testid="confirmPassword"]`).type('yuch2009ung');
      cy.get('button[type=submit]').click();
      cy.contains('수정되었습니다');
    });
    it('cancels password change', () => {
      cy.get(`@pwdModalBtn`).click();

      cy.get('[data-testid="close-modal-btn"]').click();
      cy.get(`@pwdModalBtn`).should('be.visible');
    });
  });
});
