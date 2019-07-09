const router = require('express').Router();
const adminController = require('../controllers/admin');

module.exports = () => {
  /* --- Admin --- */
  // Profile
  router.get('/me/:id', adminController.getAdmin);
  router.patch('/edit/:id', adminController.editAdminAccount);

  // Bank Account
  router.get('/bankaccount', adminController.getBankAccount);
  router.post('/bankaccount', adminController.createBankAccount);
  router.patch('/bankaccount/:id', adminController.editBankAccount);
  router.delete('/bankaccount/:id', adminController.deleteBankAccount);

  /* --- User --- */
  // Change User Password By Admin (Current Password Check is Not Required)
  router.patch('/user/password', adminController.changePasswordByAdmin);

  // User Account
  router.post('/user/register', adminController.createUser);
  router.patch('/user/edit/:id', adminController.editUserByAdmin);
  router.delete('/user/delete/:id', adminController.deleteUser);

  // get users profile
  router.get('/users', adminController.getUsersList);
  // get catering meal prices of all clients
  router.get('/users/catering/rates', adminController.getCateringRates);
  router.patch('/users/catering/rates', adminController.updateReservedPrice);
  return router;
};
