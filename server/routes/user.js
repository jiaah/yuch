const router = require('express').Router();

module.exports = () => {
  // GET usrs listing
  router.get('/', (req, res, next) => {
    res.send(res);
  });

  // GET user profile
  router.get('/profile', (req, res, next) => {
    res.send(req.user);
  });

  return router;
};
