const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Admin --- */
  // Simple Admin Password Check for Security
  router.post('/login/admin', authController.checkAdminUser);

  // User Account
  router.post('/register', authController.createUser);
  router.patch('/edit/:id', authController.editUser);
  router.patch('/edit/password/:id', authController.changePassword);
  router.delete('/delete/:id', authController.deleteUser);

  // Change User Password By Admin (Current Password Check is Not Required)
  router.patch(
    '/edit/password/:id/admin',
    authController.changePasswordByAdmin,
  );

  // Admin Bank Account
  router.get('/admin/bankaccount', authController.getBankAccount);
  router.post('/admin/bankaccount', authController.createBankAccount);
  router.patch('/admin/bankaccount/:id', authController.editBankAccount);
  router.delete('/admin/bankaccount/:id', authController.deleteBankAccount);

  // Admin Account
  router.get('/admin/account', authController.getAdminAccount);
  router.patch('/admin/account/:id', authController.editAdminAccount);

  return router;
};
