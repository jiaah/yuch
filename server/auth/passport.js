const passport = require('passport');
const knex = require('../database');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('#################serialized User');
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    knex('users')
      .where({ id })
      .first()
      .then(user => {
        console.log('##################deserialized User');
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};
