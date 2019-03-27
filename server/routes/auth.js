const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');
const util = require('../lib/util');

module.exports = () => {
  router.post('/register', authController.createUser);
  router.post('/login', authController.loginUser);
  router.post('/users', onlyLoggedIn, (req, res) => {});
  return router;
};
