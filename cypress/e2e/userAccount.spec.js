describe('user account page', () => {
  beforeEach(() => {
    cy.login('user');
  });
  it('visits accout page', () => {
    expect(window.localStorage.getItem('token')).to.exist;
    cy.contains('로그아웃');
    // forbidden to access admin route
    cy.visit('/admin/account');
    cy.contains('로그인을 해주세요.');
  });

  context('user account', () => {
    beforeEach(() => {
      cy.visit('/user/account');
      cy.get(`[data-testid="to-password-modal-btn"]`).as('pwdModalBtn');
    });
    it('edits user account info', () => {
      cy.get(`[data-testid="contactNo"]`)
        .clear()
        .type('010-2020-3030');
      cy.get('button[type=submit]').click();
    });
    it('changes password', () => {
      cy.get(`@pwdModalBtn`).click();

      cy.get(`[data-testid="password"]`).type('jiahlee88');
      cy.get(`[data-testid="newPassword"]`).type('jiahlee88');
      cy.get(`[data-testid="confirmPassword"]`).type('jiahlee88');
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
