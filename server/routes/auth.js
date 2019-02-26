const router = require('express').Router();

module.exports = () => {
  router.post('/login', (req, res) => {
    const { username, password } = req.body;
  });

  return router;
};
