const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');

// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// const JSONWEBTOKEN_KEY = require('../../secrets/jstoken_config')
//   .JSONWEBTOKEN_KEY;

const init = require('./passport');
const knex = require('../database');
const authHelpers = require('./_helpers');

const options = {};

init();

passport.use(
  new LocalStrategy(options, (username, password, done) => {
    // Match Username
    knex('users')
      .where({ username })
      .first()
      .then(user => {
        if (!user) return done(null, false, { message: 'User not found' });
        // Match Password
        if (!authHelpers.comparePassword(password, user.password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      })
      .catch(err => {
        console.log(`Passport LocalStrategy Middleware: ${err}`);
        done(err, false);
      });
  }),
);

// passport.use(
//   new JWTStrategy(
//     {
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//       secretOrKey: JSONWEBTOKEN_KEY,
//     },
//     (jwtPayload, done) => {
//       knex('users')
//         .where({ id: jwtPayload.sub })

//         .then(user => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch(err => done(err, false));
//     },
//   ),
// );

module.exports = passport;
