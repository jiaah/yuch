const router = require('express').Router();
const userController = require('../controllers/user');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  /* --- User --- */
  // get a user profile
  router.get('/me/:id', onlyLoggedIn, userController.getMe);
  // edit user account
  router.patch('/edit/:id', onlyLoggedIn, userController.editUser);
  return router;
};
