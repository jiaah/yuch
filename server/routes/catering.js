const router = require('express').Router();
const { check } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const cateringController = require('../controllers/catering');

module.exports = () => {
  /* --- Login --- */
  router.get(
    '/users',
    onlyLoggedIn,
    [check('date').isNumeric()],
    validation,
    cateringController.getLists,
  );

  // router.post(
  //   '/user/{id}',
  //   onlyLoggedIn,
  //   [check('reservePrice').isNumeric()],
  //   cateringController.loginUser,
  // );

  // router.patch(
  //   '/user/{id}',
  //   onlyLoggedIn,
  //   [check('reservePrice').isNumeric()],
  //   cateringController.loginUser,
  // );

  return router;
};
