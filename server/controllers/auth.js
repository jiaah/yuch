const knex = require('../database');
const util = require('../lib/util');

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
    .bcryptPassword(password)
    .then(hashedPassword =>
      knex('users').insert({
        companyName,
        username,
        password: hashedPassword,
        contactNo,
        email,
        mealPrice,
        lunchQty: lunchQtyValue,
        dinnerQty: dinnerQtyValue,
        bankAccountId: bankAccount,
      }),
    )
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

exports.editUser = (req, res) => {
  const userId = req.params.id;
  const {
    username,
    companyName,
    contactNo,
    email,
    mealPrice,
    lunchQty,
    dinnerQty,
    bankAccountId,
  } = req.body.userInfo;

  return knex('users')
    .where({ id: userId })
    .first()
    .update({
      companyName,
      username,
      contactNo,
      email,
      mealPrice,
      lunchQty,
      dinnerQty,
      bankAccountId,
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

exports.changePassword = (req, res) => {
  const userId = req.params.id;
  const { password, newPassword } = req.body;
  knex('users')
    .where({ id: userId })
    .first()
    .then(user => {
      if (!user) {
        return res.status(401).json('Auth failed');
      }
      util.comparePassword(password, user.password).then(isMatch => {
        if (isMatch) {
          return util.bcryptPassword(newPassword).then(hashedPassword =>
            knex('users')
              .where({ id: userId })
              .first()
              .update({
                password: hashedPassword,
              })
              .then(() => res.status(200).json())
              .catch(err => res.status(409).json(err)),
          );
        }
        return res.status(409).json('Auth failed');
      });
    });
};

exports.changePasswordByAdmin = (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;

  util.bcryptPassword(newPassword).then(hashedPassword =>
    knex('users')
      .where({ id: userId })
      .first()
      .update({
        password: hashedPassword,
      })
      .then(() => res.status(200).json())
      .catch(err => res.status(409).json(err)),
  );
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  return knex('users')
    .where({ id: userId })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.checkAdminUser = (req, res) => {
  const { password } = req.body;

  return knex('users')
    .where({ username: 'yuch' })
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
