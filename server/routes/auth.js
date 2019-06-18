const router = require('express').Router();
const authController = require('../controllers/auth');
const onlyLoggedIn = require('../lib/only-logged-in');

module.exports = () => {
  router.post('/register', authController.createUser);
  router.patch('/edit', authController.editUser);
  router.patch('/password', authController.changePassword);
  router.post('/delete/:id', authController.deleteUser);
  router.post('/login', authController.loginUser);
  router.get('/current_user', onlyLoggedIn, (req, res) => {
    console.log(req);
    res.send(req.userData);
  });
  return router;
};
