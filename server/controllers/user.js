const knex = require('../database');

/* --- User --- */
// get a user profile
exports.getMe = (req, res) => {
  const id = req.params.id;

  knex('users')
    .where({ 'users.id': id })
    .whereRaw(
      'CURRENT_DATE BETWEEN meal_price."startedAt" AND meal_price."endedAt"',
    )
    .select(
      'users.id',
      'users.companyName',
      'users.username',
      'users.contactNo',
      'users.email',
      'users.lunchQty',
      'users.dinnerQty',
      'users.bankAccountId',
      'users.address',
      'meal_price.mealPrice',
    )
    .leftJoin('meal_price', 'users.id', 'meal_price.userId')
    .then(user => res.status(200).json(user))
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
    address,
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
      address,
      updated_at: new Date().toISOString(),
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};
