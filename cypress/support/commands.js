Cypress.Commands.add('login', userType => {
  cy.visit('/login');
  const types = {
    admin: {
      username: 'yuch',
      password: 'yuch2009ung',
    },
    user: {
      username: 'jiahlee',
      password: 'jiahlee88',
    },
  };
  // grab the user
  const userInfo = types[userType];
  cy.get(`[data-testid="username"]`).type(userInfo.username);
  cy.get(`[data-testid="password"]`).type(userInfo.password);
  cy.get('button[type=submit]').click();
  cy.request({
    url: '/api/auth/login',
    method: 'POST',
    body: {
      username: userInfo.username,
      password: userInfo.password,
    },
  }).then(({ body }) =>
    cy.window().then(win => {
      win.localStorage.setItem('token', body.token);
      win.localStorage.setItem('token', body.refreshToken);
      win.sessionStorage.setItem('keepUserLoggedIn', false);
    }),
  );
});

Cypress.Commands.add(
  'seedAndVisitBankAccountPage',
  (seedData = 'fixture:bankAccounts') => {
    cy.server();
    cy.route('GET', '/api/admin/bankaccount', seedData);
    cy.visit('/admin/account/bank');
  },
);
