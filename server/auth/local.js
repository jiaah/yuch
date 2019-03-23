const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const JSONWEBTOKEN_KEY = require('../../secrets/jstoken_config')
  .JSONWEBTOKEN_KEY;

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
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        // check to see if the password matches
        if (!authHelpers.comparePass(password, user.password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log('found matched user in local.js');
        return done(null, user);
      })
      .catch(err => done(err));
  }),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: JSONWEBTOKEN_KEY,
    },
    (jwtPayload, done) => {
      console.log('jwtPayload in local.js : ', jwtPayload);
      knex('users')
        .where({ id: jwtPayload.sub })

        .then(user => {
          console.log('user in local.js: ', user);
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => done(err, false));
    },
  ),
);

module.exports = passport;
