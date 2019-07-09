const knex = require('../database');
const util = require('../lib/util');

const adminId = '30905e44-f9fc-4c23-bc66-7f6142564d89';

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
    .where({ id: adminId })
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
