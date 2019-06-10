const knex = require('../database');

exports.getUsersList = (req, res) => {
  knex('users')
    .whereNot('username', 'yuch')
    .select(
      'id',
      'company_name',
      'username',
      'contact_no',
      'email',
      'meal_price',
      'init_lunch_quantity',
      'init_dinner_quantity',
      'bank_account_id',
    )
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};
