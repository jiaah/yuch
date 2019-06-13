const knex = require('../database');
const util = require('../lib/util');

exports.createUser = (req, res) => {
  const {
    username,
    password,
    companyName,
    contactNo,
    email,
    mealPrice,
    lunchQtyValue,
    dinnerQtyValue,
    bankAccount,
  } = req.body.userInfo;

  return util
    .bcryptPassword(password.toLowerCase())
    .then(hashedPassword =>
      knex('users')
        .insert({
          companyName: companyName.toLowerCase(),
          username: username.toLowerCase(),
          password: hashedPassword,
          contactNo,
          email,
          mealPrice,
          lunchQty: lunchQtyValue,
          dinnerQty: dinnerQtyValue,
          bankAccountId: bankAccount,
        })
        .returning('*'),
    )
    .then(user => res.status(200).json(user[0].companyName))
    .catch(err => res.status(409).json(err));
};

exports.editUser = (req, res) => {
  const {
    id,
    username,
    companyName,
    contactNo,
    email,
    mealPrice,
    lunchQtyValue,
    dinnerQtyValue,
    bankAccount,
  } = req.body.userInfo;

  const lunchQty = lunchQtyValue;
  const dinnerQty = dinnerQtyValue;

  return knex('users')
    .where('id', id)
    .update({
      companyName: companyName.toLowerCase(),
      username: username.toLowerCase(),
      contactNo,
      email,
      mealPrice,
      lunchQty,
      dinnerQty,
      bankAccountId: bankAccount,
    })
    .returning('*')
    .then(user => res.status(200).json(user[0].companyName))
    .catch(err => res.status(409).json(err));
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  let companyName;
  return knex('users')
    .where({ username })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json('Auth failed');
      }

      if (!!user && user.username !== 'yuch') {
        if (!util.comparePassword(password, user.password)) {
          return res.status(409).json('Auth failed');
        }
      }

      // Sync hashed password (DB) !== Async hashed password (BE)
      // could not save hashed password from Async function in DB.
      if (!!user && user.username === 'yuch') {
        if (!util.compareAdminPassword(password, user.password)) {
          return res.status(409).json('Auth failed');
        }
      }

      companyName = user.companyName;
      return util.getRandomToken(user);
    })
    .then(token => {
      res.status(200).json({ token, companyName });
      res.header('Authorization', `Bearer + ${token}`);
    })
    .catch(err => res.status(500).json(err));
};
