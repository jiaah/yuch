const router = require('express').Router();
const authController = require('../controllers/auth');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Admin --- */
  // Simple Admin Password Check for Security
  router.post('/login/admin', authController.checkAdminUser);

  /* --- Forgot username/password --- */
  router.post('/forgot/username', authController.forgotUsername);
  router.post('/forgot/password', authController.forgotPassword);
  return router;
};
