describe('user', () => {
  beforeEach(() => {});
  it('can visit the app', () => {
    cy.login('user').then(() => {
      expect(window.localStorage.getItem('token')).to.exist;
      cy.visit('/');
      cy.contains('로그아웃');
    });
  });
});
