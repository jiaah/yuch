const router = require('express').Router();
const authController = require('../controllers/auth');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Admin --- */
  // Simple Admin Password Check for Security
  router.post('/admin/login', authController.checkAdminUser);

  return router;
};
