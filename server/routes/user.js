const router = require('express').Router();
const userController = require('../controllers/user');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  // get users profile
  router.get('/users', userController.getUsersList);
  // get catering meal prices of all clients
  router.get('/users/catering/rates', userController.getCateringRates);
  // get a user profile
  router.get('/me/:id', userController.getMe);
  // get admin profile
  router.get('/admin/me/:id', userController.getAdmin);
  return router;
};
