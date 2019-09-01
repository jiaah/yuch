describe('user', () => {
  beforeEach(() => {
    cy.login('user');
  });
  it('visits accout page', () => {
    expect(window.localStorage.getItem('token')).to.exist;
    cy.contains('로그아웃');
    cy.visit('/user/account');
  });

  context('user account', () => {
    beforeEach(() => {
      cy.visit('/user/account');
    });
    it('edits user account info', () => {
      cy.get(`[data-testid="contactNo"]`)
        .clear()
        .type('010-2020-3030');
      cy.get('button[type=submit]').click();
    });
    it('change password', () => {
      cy.get(`[data-testid="to-password-btn"]`).click();

      cy.get(`[data-testid="password"]`).type('jiahlee88');
      cy.get(`[data-testid="newPassword"]`).type('jiahlee88');
      cy.get(`[data-testid="confirmPassword"]`).type('jiahlee88');
      cy.get('button[type=submit]').click();
      cy.contains('수정되었습니다');
    });
  });
});
