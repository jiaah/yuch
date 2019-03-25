const router = require('express').Router();

module.exports = dataLoader => {
  router.post('/register', dataLoader.createUser);
  router.post('/login', dataLoader.loginUser);

  return router;
};
