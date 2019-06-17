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

exports.changePassword = (req, res) => {
  const { id, password, newPassword } = req.body;
  knex('users')
    .where({ id })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json('Auth failed');
      }
      util.comparePassword(password, user.password).then(isMatch => {
        if (isMatch) {
          return util
            .bcryptPassword(newPassword.toLowerCase())
            .then(hashedPassword =>
              knex('users')
                .where({ id })
                .first()
                .update({
                  password: hashedPassword,
                })
                .returning('*')
                .then(user => res.status(200).json(user[0].companyName))
                .catch(err => res.status(409).json(err)),
            );
        }
      });
    });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  let companyName;
  let userData;
  return knex('users')
    .where({ username })
    .first()
    .then(user => {
      userData = user;
      companyName = user.companyName;
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
      return res.status(200).json({ token, companyName });
    })
    .catch(err => res.status(500).json(err));
};
