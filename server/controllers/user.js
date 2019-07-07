const knex = require('../database');

// get admin profile
exports.getAdmin = (req, res) => {
  const userId = req.params.id;
  knex('users')
    .where({ id: userId })
    .first()
    .select('id', 'companyName', 'username', 'contactNo', 'email')
    .then(admin => res.status(200).json(admin))
    .catch(err => res.status(500).json(err));
};

/* --- User --- */
// get users profile
exports.getUsersList = (req, res) => {
  knex('users')
    .whereNot('username', 'yuch')
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
      'updated_at',
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};

// get catering meal prices of all clients
exports.getCateringRates = (req, res) => {
  knex('users')
    .whereNot('username', 'yuch')
    .select('id', 'companyName', 'username', 'mealPrice')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};

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
