const router = require('express').Router();
const userController = require('../controllers/user');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  // GET users list
  // Bug: onlyLoggedIn middlesware often throw an error
  router.get('/users', userController.getUsersList);

  return router;
};
