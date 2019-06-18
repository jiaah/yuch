const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  router.post('/register', authController.createUser);
  router.patch('/edit/:id', authController.editUser);
  router.patch('/edit/password/:id', authController.changePassword);
  router.post('/login/admin', authController.checkAdminUser);
  router.delete('/delete/:id', authController.deleteUser);
  router.post('/login', authController.loginUser);
  return router;
};
