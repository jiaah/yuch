const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Password --- */
  // simple Admin Password Check to secure sensitive data
  router.post('/login/admin', authController.verifyAdminUser);

  // change password (user's current password is required)
  router.patch('/change/password', onlyLoggedIn, authController.changePassword);

  // reset password (user's current password is not required)
  router.patch('/reset/password', onlyLoggedIn, authController.resetPassword);

  /* --- Forgot username/password --- */
  router.post('/forgot/username/email', authController.findUsernameWithEmail);
  router.post(
    '/forgot/username/contact',
    authController.findUsernameWithContact,
  );
  router.post('/forgot/password', authController.forgotPassword);

  // reset password with access token
  router.patch('/reset/password/:token', authController.resetPasswordWithToken);

  /* --- Refresh Token --- */
  router.post('/refresh', authController.refreshToken);

  return router;
};
