const knex = require('../database');
const util = require('./util');

function createUser(req, res) {
  const { companyName, username, password, contactNumber } = req.body;

  util
    .bcryptPassword(password)
    .then(hashedPassword =>
      knex('users')
        .insert({
          company_name: companyName,
          username,
          password: hashedPassword,
          contact_no: contactNumber,
        })
        .returning('*'),
    )
    .then(user => util.getRandomToken(user))
    .then(token => res.status(201).json({ token }))
    .catch(err => res.status(409).json(err));
}

function loginUser(req, res) {
  const { username, password } = req.body;

  return knex('users')
    .where({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(404).json('User not found!');
      }
      if (!util.comparePassword(password, user.password)) {
        return res.status(409).json('Password incorrect!');
      }
      return util.getRandomToken(user);
    })
    .then(token => res.status(201).json({ token }))
    .catch(err => res.status(500).json(err));
}

module.exports = {
  createUser,
  loginUser,
};
