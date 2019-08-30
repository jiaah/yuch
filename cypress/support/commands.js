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
  // this is an example of skipping your UI and logging in programmatically

  // setup some basic types
  // and user properties
  const types = {
    admin: {
      username: 'yuchung12',
      companyName: 'yuchung12',
      password: 'yuchung1234',
      contactNo: '054-2323-2222',
      admin: true,
    },
    user: {
      username: 'jiahlee12',
      companyName: 'jiahlee12',
      password: 'jiahlee12',
      contactNo: '054-1111-7272',
      bankAccountId: 'd9a9e5c6-186e-412a-9307-93990ac1a0a5',
      email: 'jiah@gmail.com',
      mealPrice: 9000,
      businessType: 'catering',
      admin: false,
    },
  };
  // grab the user
  const userInfo = types[userType];
  console.log('userInfo: ', userInfo);

  // create the user first in the DB
  return cy
    .request('POST', '/api/admin/user/register', userInfo)
    .its('body')
    .then(body => {
      console.log('body: ', body);
      // assuming the server sends back the user details
      // including a randomly generated password
      // we can now login as this newly created user
      cy.request({
        url: '/api/auth/login',
        method: 'POST',
        body: {
          username: body.username,
          password: body.password,
        },
      }).then(({ body }) => {
        console.log('body: ', body);
        // Save received auth token to local storage
        window.localStorage.setItem('token', body.token);
        return body.data;
      });
    });
});
