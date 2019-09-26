const router = require('express').Router();
const { query } = require('express-validator');
const onlyLoggedIn = require('../lib/only-logged-in');
const validation = require('../lib/validation');
// const isAdmin = require('../lib/isAdmin');
const revenueController = require('../controllers/revenue');

module.exports = () => {
  /* --- Client  --- */
  router.get(
    '/',
    onlyLoggedIn,
    [query('date').matches(/^[0-9]{4}$/)],
    validation,
    revenueController.listsByMonthly,
  );

  /* --- Client --- */
  router.get(
    '/yuch',
    onlyLoggedIn,
    [query('date').matches(/^[0-9]{4}$/)],
    validation,
    revenueController.listsYuchByMonthly,
  );

  return router;
};
