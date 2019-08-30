// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', userType => {
  const types = {
    admin: {
      username: 'yuchung',
      companyName: 'yuchung',
      password: 'yuchung12',
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

  // create the user first in the DB
  // return cy
  //   .request('POST', '/api/admin/user/register', { userInfo })
  //   .then(() => {});

  cy.request({
    url: '/api/auth/login',
    method: 'POST',
    body: {
      username: userInfo.username,
      password: userInfo.password,
    },
  }).then(({ body }) => {
    window.localStorage.setItem('token', body.token);
    window.sessionStorage.setItem('keepUserLoggedIn', false);
  });
});
