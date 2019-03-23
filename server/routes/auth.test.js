process.env.NODE_ENV = 'test';

const mockKnex = require('mock-knex');

const tracker = mockKnex.getTracker();
const server = require('../server');
const knex = require('../__tests__/__mocks__/knex');
const adminInfo = require('../../secrets/admin_info');

tracker.install();

describe('routes: auth', () => {
  beforeEach(() => {
    // REQUEST SERVER
    // knex.migrate
    //   .rollback()
    //   .then(() => knex.migrate.latest())
    //   .then(() => knex.seed.run());
    tracker.on('query', query => {
      const users = [{}];
      query.response(users);
    });
  });
  afterEach(() => {
    knex.migrate.rollback();
  });

  describe('POST /auth/login', () => {
    it('should login a user', done => {
      // HTTP REQUEST
      // err should not exist
      // res.redirects.length = 0
      // res.status = 200
      // res.type = 'application/json'
      // res.body.status = 'success'
      done();
    });
    it('should not login an unregistered user', done => {
      // HTTP REQUEST
      // err should exist
      // res.redirects.length = 0
      // res.status = 404
      // res.type = 'application/json'
      // res.body.status = 'User not found'
      done();
    });
  });

  describe('GET /auth/logout', () => {
    it('should logout a user', done => {
      // HTTP REQUEST
      // err should not exist
      // res.redirects.length = 0
      // res.status = 200
      // res.type = 'application/json'
      // res.body.status = 'success'
      done();
    });
    it('should throw an error if a user is not logged in', done => {
      // err should exist
      // res.redirects.length = 0
      // res.status = 401
      // res.type = 'application/json'
      // res.body.status = 'Please log in'
      done();
    });
  });
});
