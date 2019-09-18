const router = require('express').Router();
const { check, query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const cateringController = require('../controllers/catering');

module.exports = () => {
  /* --- Client --- */
  router.get(
    '/user/:userId',
    onlyLoggedIn,
    [
      query('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    cateringController.getOne,
  );

  /* --- Client --- */
  router.patch(
    '/user/:userId',
    onlyLoggedIn,
    [
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
      check('lunchQty').isNumeric(),
      check('dinnerQty').isNumeric(),
      check('lateNightSnackQty').isNumeric(),
    ],
    validation,
    cateringController.setOne,
  );

  /* --- Admin --- */
  router.get(
    '/users',
    onlyLoggedIn,
    [
      query('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    cateringController.getLists,
  );

  /* --- Admin --- */
  router.patch(
    '/users',
    onlyLoggedIn,
    [
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    cateringController.setBatch,
  );

  /* --- Admin --- */
  router.patch(
    '/endofservice/user/:userId',
    onlyLoggedIn,
    [
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
    ],
    validation,
    cateringController.resetQty,
  );

  return router;
};
