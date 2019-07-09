const knex = require('../database');
const util = require('../lib/util');

/* --- Admin & User --- */
// Change Password
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
          return util.bcryptPassword(newPassword).then(hashedPassword =>
            knex('users')
              .where({ id })
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

/* --- User --- */
// get a user profile
exports.getMe = (req, res) => {
  const userId = req.params.id;
  knex('users')
    .where({ id: userId })
    .first()
    .select(
      'id',
      'companyName',
      'username',
      'contactNo',
      'email',
      'mealPrice',
      'lunchQty',
      'dinnerQty',
      'bankAccountId',
    )
    .then(admin => res.status(200).json(admin))
    .catch(err => res.status(500).json(err));
};

// edit a user profile
exports.editUser = (req, res) => {
  const userId = req.params.id;
  const {
    username,
    companyName,
    contactNo,
    email,
    lunchQty,
    dinnerQty,
  } = req.body.userInfo;

  return knex('users')
    .where({ id: userId })
    .first()
    .update({
      companyName,
      username,
      contactNo,
      email,
      lunchQty,
      dinnerQty,
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};
