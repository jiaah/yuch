describe('user', () => {
  beforeEach(() => {});
  it('can visit the app', () => {
    cy.login('user');
    // cy.visit('/user/account');
    cy.request({
      url: '/api/admin/users',
      method: 'GET',
      // body: {
      //   email: body.username,
      //   password: body.password,
      // },
    });
  });
});
