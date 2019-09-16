const router = require('express').Router();
const { check } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const cateringController = require('../controllers/catering');

module.exports = () => {
  router.get(
    '/user/{id}',
    onlyLoggedIn,
    [
      check('date')
        .matches(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/)
        .isISO8601(),
    ],
    cateringController.getLists,
  );

  /* --- Login --- */
  router.get(
    '/users',
    onlyLoggedIn,
    [check('date').isNumeric()],
    validation,
    cateringController.getLists,
  );

  // router.patch(
  //   '/user/{id}',
  //   onlyLoggedIn,
  //   [check('reservePrice').isNumeric()],
  //   cateringController.loginUser,
  // );

  return router;
};
