const passport = require('passport');
const knex = require('../database');

module.exports = () => {
  // pass user data pulled out of the database from localstrategy function
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // turn user id into a user
  passport.deserializeUser((id, done) => {
    knex('users')
      .where({ id })
      .first()
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.error(
          `There was an error accessing the records of user with id: ' ${id}`,
          err,
        );
        done(err, null);
      });
  });
};
