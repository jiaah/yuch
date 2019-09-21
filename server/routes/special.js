const router = require('express').Router();
const { check, query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
const isAdmin = require('../lib/isAdmin');
const specialController = require('../controllers/special');

module.exports = () => {
  /* --- Admin --- */
  router.get(
    '/users',
    onlyLoggedIn,
    isAdmin,
    [query('date').matches(/^[0-9]{6}$/)],
    validation,
    specialController.lists,
  );

  /* --- Common --- */
  router.post(
    '/',
    onlyLoggedIn,
    [
      check('userId'),
      check('companyName')
        .not()
        .isEmpty()
        .trim(),
      check('contactNo')
        .not()
        .isEmpty()
        .trim(),
      check('address')
        .not()
        .isEmpty()
        .trim(),
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
      check('time').matches(/^[0-9]{1,2}:[0-9]{1,2}\s(pm|am)$/),
      check('quantity').isNumeric(),
      check('mealPrice').isNumeric(),
    ],
    validation,
    specialController.create,
  );

  /* --- Common --- */
  router.patch(
    '/:specialId',
    onlyLoggedIn,
    [
      check('userId'),
      check('companyName')
        .trim()
        .not()
        .isEmpty()
        .trim(),
      check('contactNo')
        .trim()
        .not()
        .isEmpty()
        .trim(),
      check('address')
        .trim()
        .not()
        .isEmpty()
        .trim(),
      check('date')
        .matches(/^[0-9]{8}$/)
        .isISO8601(),
      check('time').matches(/^[0-9]{1,2}:[0-9]{1,2}\s(pm|am)$/),
      check('quantity').isNumeric(),
      check('mealPrice').isNumeric(),
    ],
    validation,
    specialController.update,
  );

  /* --- Admin --- */
  router.delete(
    '/user/:specialId',
    onlyLoggedIn,
    isAdmin,
    specialController.remove,
  );

  /* --- Client --- */
  router.get(
    '/user/:userId',
    onlyLoggedIn,
    [query('date').matches(/^[0-9]{6}$/)],
    validation,
    specialController.getOne,
  );

  // /* --- Client --- */
  // router.post(
  //   '/user',
  //   onlyLoggedIn,
  //   [
  //     check('userId')
  //       .optional()
  //       .isUUID(),
  //     check('companyName')
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('contactNo')
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('address')
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('date')
  //       .matches(/^[0-9]{8}$/)
  //       .isISO8601(),
  //     check('time').matches(/^[0-9]{1,2}:[0-9]{1,2}\s(pm|am)$/),
  //     check('quantity').isNumeric(),
  //     check('mealPrice').isNumeric(),
  //   ],
  //   validation,
  //   specialController.create,
  // );

  // /* --- Client --- */
  // router.patch(
  //   '/user/:specialId',
  //   onlyLoggedIn,
  //   [
  //     check('companyName')
  //       .trim()
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('contactNo')
  //       .trim()
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('address')
  //       .trim()
  //       .not()
  //       .isEmpty()
  //       .trim(),
  //     check('date')
  //       .matches(/^[0-9]{8}$/)
  //       .isISO8601(),
  //     check('time').matches(/^[0-9]{1,2}:[0-9]{1,2}\s(pm|am)$/),
  //     check('quantity').isNumeric(),
  //     check('mealPrice').isNumeric(),
  //   ],
  //   validation,
  //   specialController.update,
  // );

  return router;
};
