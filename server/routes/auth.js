const router = require('express').Router();
const authController = require('../controllers/auth');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Password --- */
  // simple Admin Password Check for Security
  router.post('/login/admin', authController.checkAdminUser);

  // change password (user's current password is required)
  router.patch('/change/password', authController.changePassword);

  // reset password (user's current password is not required)
  router.patch('/reset/password', authController.resetPassword);

  /* --- Forgot username/password --- */
  router.post('/forgot/username', authController.forgotUsername);
  router.post('/forgot/password', authController.forgotPassword);
  return router;
};
