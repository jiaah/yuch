describe('bank account page', () => {
  beforeEach(() => {
    cy.login('admin');
  });
  it('renders a bank account', () => {
    cy.seedAndVisitBankAccountPage([
      {
        accountHolder: '유청(주)',
        accountNo: '054-745-0999',
        bankName: '유청',
        id: 'd9a9e5c6-186e-412a-9307-93990ac1a0a5',
      },
    ]);
    cy.get('[data-testid="bank-account--tablerow"]').as('bank-account--row');
    cy.get('@bank-account--row').should('have.length', 1);
  });

  it('renders bank accounts list', () => {
    cy.seedAndVisitBankAccountPage();
    cy.get('[data-testid="bank-account--tablerow"]').as('bank-account--row');
    cy.get('@bank-account--row').should('have.length', 3);
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
