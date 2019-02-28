const router = require('express').Router();
const pool = require('../db');

module.exports = () => {
  router.post('/login', (request, response, next) => {
    const { username, password } = request.body;
  });

  return router;
};
