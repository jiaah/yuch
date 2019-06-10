const knex = require('../database');
const util = require('../lib/util');

exports.createUser = (req, res) => {
  const {
    username,
    password,
    companyName,
    contactNumber,
    email,
    mealPrice,
    lunchQuantity,
    dinnerQuantity,
    bankAccount,
  } = req.body.userInfo;

  util
    .bcryptPassword(password)
    .then(hashedPassword =>
      knex('users')
        .insert({
          company_name: companyName.toLowerCase(),
          username: username.toLowerCase(),
          password: hashedPassword.toLowerCase(),
          contact_no: contactNumber,
          email,
          meal_price: mealPrice,
          init_lunch_quantity: lunchQuantity,
          init_dinner_quantity: dinnerQuantity,
          bank_account_id: bankAccount,
        })
        .returning('*'),
    )
    .then(() => res.status(200).json(companyName))
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

      companyName = user.company_name;
      return util.getRandomToken(user);
    })
    .then(token => {
      res.status(200).json({ token, companyName });
      res.header('Authorization', `Bearer + ${token}`);
    })
    .catch(err => res.status(500).json(err));
};
