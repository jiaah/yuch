const router = require('express').Router();
const { check } = require('express-validator');
const adminController = require('../controllers/admin');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');

module.exports = () => {
  /* --- Admin --- */
  // Profile
  router.get('/me/:id', onlyLoggedIn, adminController.getAdmin);
  router.patch('/edit/:id', onlyLoggedIn, adminController.editAdminAccount);

  // Bank Account
  router.get('/bankaccount', onlyLoggedIn, adminController.getBankAccount);
  router.post('/bankaccount', onlyLoggedIn, adminController.createBankAccount);
  router.patch(
    '/bankaccount/:id',
    onlyLoggedIn,
    adminController.editBankAccount,
  );
  router.delete(
    '/bankaccount/:id',
    onlyLoggedIn,
    adminController.deleteBankAccount,
  );

  /* --- User --- */
  // User Account
  router.post('/user/register', onlyLoggedIn, adminController.createUser);
  router.patch(
    '/user/edit/:id',
    onlyLoggedIn,
    [
      check('userId').isUUID(),
      check('reservePrice').isNumeric(),
      check('reserveDate').matches(/^[0-9]{4}\/[0-9]{2}$/),
    ],
    adminController.editUserByAdmin,
  );
  router.delete('/user/delete/:id', onlyLoggedIn, adminController.deleteUser);

  // get users profile
  router.get('/users', onlyLoggedIn, adminController.getUsersList);

  // get users profile
  router.get('/mealPrices/:id', onlyLoggedIn, adminController.getMealPriceList);

  // get users businessNo
  router.get(
    '/users/business',
    onlyLoggedIn,
    adminController.getUsersBusinessNoList,
  );

  // get catering meal prices of all clients
  router.get(
    '/users/catering/rates',
    onlyLoggedIn,
    adminController.getCateringRates,
  );
  router.patch(
    '/users/catering/rates',
    onlyLoggedIn,
    [
      check('userId').isUUID(),
      check('reservePrice').isNumeric(),
      check('reserveDate').matches(/^[0-9]{4}\/[0-9]{2}$/),
    ],
    validation,
    adminController.updateReservedPrice,
  );

  return router;
};
