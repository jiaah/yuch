const knex = require('../database');
const util = require('../lib/util');

/* --- Login --- */
exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  let id;
  let companyName;
  let userData;
  let isAdmin;
  return knex('users')
    .where({ username })
    .first()
    .then(user => {
      userData = user;
      id = user.id;
      companyName = user.companyName;
      isAdmin = user.isAdmin;
      if (!user) {
        return res.status(404).json('User not found');
      }
      return util.comparePassword(password, user.password);
    })
    .then(isMatch => {
      if (isMatch) {
        const token = util.getRandomToken(userData);
        return token;
      }
      return res.status(409).json('Auth failed');
    })
    .then(token => {
      res.header('Authorization', `Bearer + ${token}`);
      return res.status(200).json({ token, id, companyName, isAdmin });
    })
    .catch(err => res.status(500).json(err));
};

/* --- Admin --- */
// check admin password for security
exports.checkAdminUser = (req, res) => {
  const { password } = req.body;
  return knex('users')
    .where({ isAdmin: true })
    .first()
    .then(user => util.comparePassword(password, user.password))
    .then(isMatch => {
      if (isMatch) {
        return res.status(200).json();
      }
      return res.status(409).json('Auth failed');
    })
    .catch(err => res.status(500).json(err));
};

/* --- Forgot username/password --- */
exports.forgotUsername = (req, res) =>
  knex('users')
    .where({ email: req.body.email })
    .first()
    .then(user => {
      if (!user || user === undefined) {
        return res.status(409).json('Can not find user email');
      }
      if (user) {
        return res.status(200).json(user.username);
      }
    });

exports.forgotPassword = (req, res) => {
  const { username, email } = req.body;

  return knex('users')
    .where({ username, email })
    .first()
    .then(user => {
      if (!user || user === undefined) {
        return res.status(409).json('Can not find user email');
      }
      if (user) {
        return res.status(200).json();
      }
    });
};
