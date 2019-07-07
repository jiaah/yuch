const router = require('express').Router();
const userController = require('../controllers/user');

module.exports = () => {
  // get admin profile
  router.get('/admin/me/:id', userController.getAdmin);
  /* --- User --- */
  // get users profile
  router.get('/users', userController.getUsersList);
  // get catering meal prices of all clients
  router.get('/users/catering/rates', userController.getCateringRates);
  // get a user profile
  router.get('/me/:id', userController.getMe);
  // edit user account
  router.patch('/edit/:id', userController.editUser);
  return router;
};
