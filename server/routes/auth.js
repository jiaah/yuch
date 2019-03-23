const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('../auth/local');
const authHelpers = require('../auth/_helpers');
const JSONWEBTOKEN_KEY = require('../../secrets/jstoken_config')
  .JSONWEBTOKEN_KEY;

function handleResponse(res, code, statusMsg) {
  res.status(code).json({ status: statusMsg });
}

module.exports = () => {
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        handleResponse(res, 500, 'error');
      }
      if (!user) {
        handleResponse(res, 404, 'User not found');
      }
      if (user) {
        req.login(user, { session: false }, err => {
          if (err) {
            handleResponse(res, 500, 'error');
          }
          handleResponse(res, 200, 'success');

          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(user, JSONWEBTOKEN_KEY);
          console.log('token: ', token);
          console.log('session', req.session);
          console.log(' user: ', user);
          return res.json({ user, token });
        });
      }
    })(req, res, next);
  });

  router.get('/logout', (req, res, next) => {
    req.logout();
    handleResponse(res, 200, 'success');
  });

  return router;
};
