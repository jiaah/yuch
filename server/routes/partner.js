const router = require('express').Router();
const partnerController = require('../controllers/partner');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  /* --- Employees --- */
  router.get('/employees', onlyLoggedIn, partnerController.getEmployees);
  router.post('/employee', onlyLoggedIn, partnerController.createEmployee);
  router.patch('/employee/:id', onlyLoggedIn, partnerController.updateEmployee);
  router.delete(
    '/employee/:id',
    onlyLoggedIn,
    partnerController.deleteEmployee,
  );

  /* --- Partners --- */
  router.get('/business', onlyLoggedIn, partnerController.getPartners);
  router.post('/business', onlyLoggedIn, partnerController.createPartner);
  router.patch('/business/:id', onlyLoggedIn, partnerController.updatePartner);
  router.delete('/business/:id', onlyLoggedIn, partnerController.deletePartner);
  return router;
};
