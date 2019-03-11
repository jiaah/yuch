const router = require('express').Router();
const knex = require('../database');

module.exports = () => {
  router.get('/', (req, res) => {
    knex
      .select()
      .from('users')
      .then(data => res.send(data));
  });

  return router;
};
