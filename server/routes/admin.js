const router = require('express').Router();
const adminController = require('../controllers/admin');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  router.get('/bankaccount', adminController.getBankAccount);
  router.post('/bankaccount', adminController.createBankAccount);
  router.patch('/bankaccount', adminController.editBankAccount);
  return router;
};
