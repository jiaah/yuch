Cypress.Commands.add('login', userType => {
  cy.visit('/login');
  const types = {
    admin: {
      username: 'yuch',
      companyName: 'yuchung',
      password: 'yuch2009ung',
      contactNo: '010-2020-3939',
      bankAccountId: 'd9a9e5c6-186e-412a-9307-93990ac1a0a5',
      email: 'yuchung@gmail.com',
      mealPrice: 9000,
      businessType: 'catering',
      admin: true,
    },
    user: {
      username: 'jiahlee',
      companyName: 'jiahlee88',
      password: 'jiahlee88',
      contactNo: '054-1111-7272',
      bankAccountId: 'd9a9e5c6-186e-412a-9307-93990ac1a0a5',
      email: 'jiah12@gmail.com',
      mealPrice: 9000,
      businessType: 'catering',
      admin: false,
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
      win.sessionStorage.setItem('keepUserLoggedIn', false);
    }),
  );
});
