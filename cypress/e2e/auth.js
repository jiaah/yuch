// <reference types="cypress" />;
import faker from 'faker';

describe('user', () => {
  it('can visit login app', () => {
    cy.visit('/login');
  });

  it('protected route', () => {});
});
