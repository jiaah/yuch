const bcrypt = require('bcryptjs');
const knex = require('../database');

function createUser(req) {
  const { companyName, username, password, contactNumber } = req.body;
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return knex('users')
    .insert({
      company_name: companyName,
      username,
      password: hash,
      contact_no: contactNumber,
    })
    .returning('*')
    .catch(err => console.log(err));
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// function loginRequired(req, res, next) {
//   if (!req.user) return res.status(401).json({ status: 'Please log in' });
//   return next();
// }

// function loginRedirect(req, res, next) {
//   if (req.user)
//     return res.status(400).json({ status: 'You are already logged in' });
//   return next();
// }

module.exports = {
  comparePass,
  createUser,
};
