const router = require('express').Router();
const { check, query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const isAdmin = require('../lib/isAdmin');
const restoController = require('../controllers/resto');
const cateringController = require('../controllers/catering');

module.exports = () => {
  router.get(
    '/',
    onlyLoggedIn,
    [
      query('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    restoController.getOne,
  );

  router.patch(
    '/',
    onlyLoggedIn,
    [
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    restoController.setOne,
  );

  /* --- Admin --- */
  router.get(
    '/users',
    onlyLoggedIn,
    isAdmin,
    [
      query('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    cateringController.getRestaurantLists,
  );

  return router;
};
