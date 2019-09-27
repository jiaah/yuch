const router = require('express').Router();
const { check, query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const restoController = require('../controllers/resto');

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

  return router;
};
