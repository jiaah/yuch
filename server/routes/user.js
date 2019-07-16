const router = require('express').Router();
const userController = require('../controllers/user');

module.exports = () => {
  /* --- User --- */
  // get a user profile
  router.get('/me/:id', userController.getMe);
  // edit user account
  router.patch('/edit/:id', userController.editUser);
  return router;
};
