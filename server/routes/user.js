const router = require('express').Router();
const userController = require('../controllers/user');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  router.get('/users', userController.getUsersList);
  router.get('/me/:id', userController.getMe);
  router.get('/admin/me/:id', userController.getAdmin);
  return router;
};
