const router = require('express').Router();
const knex = require('../database');

module.exports = () => {
  router.get('/', (req, res) => {
    console.log('@@@@@@@@', req.session);
    knex
      .select()
      .from('users')
      .then(data => res.send(data));
  });

  return router;
};
