// <reference types="cypress" />;
import faker from 'faker';

describe('user', () => {
  beforeEach(() => {
    cy.visit('http://localhost:9080');
  });

  it('can visit login app', () => {
    cy.visit('/login');
  });

  it('blocks protected routes', () => {});
});
