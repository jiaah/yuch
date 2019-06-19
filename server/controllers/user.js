const knex = require('../database');

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
    // .oerderBy('updated_at', 'desc')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};
