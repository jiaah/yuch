const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  /* --- Login --- */
  router.post('/login', authController.loginUser);

  /* --- Admin & User --- */
  router.patch('/password/:id', authController.changePassword);

  /* --- Admin --- */
  // Simple Admin Password Check for Security
  router.post('/admin/login', authController.checkAdminUser);
  // User Account
  router.post('/admin/user/register', authController.createUser);
  router.patch('/admin/user/edit/:id', authController.editUserByAdmin);
  router.delete('/admin/user/delete/:id', authController.deleteUser);
  // Change User Password By Admin (Current Password Check is Not Required)
  router.patch(
    '/admin/user/password/:id',
    authController.changePasswordByAdmin,
  );
  // Admin Bank Account
  router.get('/admin/bankaccount', authController.getBankAccount);
  router.post('/admin/bankaccount', authController.createBankAccount);
  router.patch('/admin/bankaccount/:id', authController.editBankAccount);
  router.delete('/admin/bankaccount/:id', authController.deleteBankAccount);
  // Admin Account
  router.patch('/admin/edit/:id', authController.editAdminAccount);

  /* --- User --- */
  // User Account
  router.patch('/user/edit/:id', authController.editUser);
  return router;
};
