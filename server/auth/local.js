const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const init = require('./passport');
const knex = require('../database');
const authHelpers = require('./_helpers');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    // check to see if the username exists
    knex('users')
      .where({ username })
      .first()
      .then(user => {
        if (!user) return done(null, false);
        // check to see if the password matches
        if (!authHelpers.comparePass(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }),
);

module.exports = passport;
