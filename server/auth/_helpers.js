const bcrypt = require('bcryptjs');
const knex = require('../database');

function comparePassword(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req, res) {
  const { companyName, username, password, contactNumber } = req.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  // The database checks duplicate user
  return knex('users')
    .insert({
      company_name: companyName,
      username,
      password: hash,
      contact_no: contactNumber,
    })
    .returning('*')
    .catch(() => res.status(409).json({ status: 'User already exists' }));
}

function loginRedirect(req, res, next) {
  if (req.isAuthenticated())
    return res.status(400).json({ status: 'You are already logged in' });
  return next();
}

function loginRequired(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = {
  comparePassword,
  createUser,
  loginRedirect,
  loginRequired,
};
