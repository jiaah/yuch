const router = require('express').Router();
const { check, query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const isAdmin = require('../lib/isAdmin');
const invoiceController = require('../controllers/invoice');

module.exports = () => {
  /* --- ADMIN  --- */
  router.patch(
    '/users',
    onlyLoggedIn,
    isAdmin,
    [check('date').matches(/^[0-9]{6}$/)],
    validation,
    invoiceController.update,
  );

  /* --- Client  --- */
  router.get(
    '/users',
    onlyLoggedIn,
    [query('date').matches(/^[0-9]{6}$/)],
    validation,
    invoiceController.lists,
  );

  /* --- Client --- */
  router.get(
    '/user/:userId',
    onlyLoggedIn,
    [query('date').matches(/^[0-9]{6}$/)],
    validation,
    invoiceController.findOne,
  );

  return router;
};
