const knex = require('../database');
const util = require('../lib/util');

/* --- Admin --- */
// admin profile
exports.getAdmin = (req, res) => {
  const userId = req.params.id;
  knex('users')
    .where({ id: userId })
    .first()
    .select('id', 'companyName', 'username', 'contactNo', 'email')
    .then(admin => res.status(200).json(admin))
    .catch(err => res.status(500).json(err));
};

exports.editAdminAccount = (req, res) => {
  const userId = req.params.id;
  const { username, companyName, contactNo, email } = req.body.values;

  return knex('users')
    .where({ id: userId })
    .first()
    .update({
      companyName,
      username,
      contactNo,
      email,
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

// bank account
exports.getBankAccount = (req, res) =>
  knex('bank_account')
    .select('*')
    .then(bankAccount => res.status(200).json(bankAccount))
    .catch(err => res.status(500).json(err));

exports.createBankAccount = (req, res) => {
  const { accountHolder, bankName, accountNo } = req.body;
  knex('bank_account')
    .insert({ accountHolder, bankName, accountNo })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.editBankAccount = (req, res) => {
  const bankId = req.params.id;
  const { accountHolder, bankName, accountNo } = req.body;
  knex('bank_account')
    .where({ id: bankId })
    .first()
    .update({
      accountHolder,
      bankName,
      accountNo,
    })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.deleteBankAccount = (req, res) => {
  const bankId = req.params.id;
  knex('bank_account')
    .where({ id: bankId })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

/* --- User --- */
// user account
exports.createUser = (req, res) => {
  const {
    username,
    password,
    companyName,
    contactNo,
    email,
    mealPrice,
    lunchQty,
    dinnerQty,
    bankAccountId,
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
        reservePrice: null,
        reserveDate: '',
        lunchQty,
        dinnerQty,
        bankAccountId,
      }),
    )
    .then(() => res.status(200).json())
    .catch(err => res.status(409).json(err));
};

exports.editUserByAdmin = (req, res) => {
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

exports.changePasswordByAdmin = (req, res) => {
  const { id, newPassword } = req.body;

  util.bcryptPassword(newPassword).then(hashedPassword =>
    knex('users')
      .where({ id })
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

// get users profile, meal prices && bank accounts data
exports.getUsersList = (req, res) => {
  knex()
    .whereNot('users.username', 'yuch')
    .select(
      'users.id',
      'users.companyName',
      'users.username',
      'users.contactNo',
      'users.email',
      'users.lunchQty',
      'users.dinnerQty',
      'users.bankAccountId',
      'users.updated_at',
      'meal_price.mealPrice',
    )
    .from('users')
    .leftJoin('meal_price', 'users.id', 'meal_price.userId')
    .then(users => {
      knex('bank_account')
        .select('*')
        .then(bankAccounts => res.status(200).json({ users, bankAccounts }))
        .catch(err => res.status(500).json(err));
    });
};

// get catering meal prices of all clients & users id, companyName*
exports.getCateringRates = (req, res) => {
  knex()
    .whereNot('users.isAdmin', true)
    .select(
      'meal_price.userId',
      'users.companyName',
      'meal_price.mealPrice',
      'meal_price.reservePrice',
      'meal_price.reserveDate',
      'meal_price.updated_at',
    )
    .from('meal_price')
    .leftJoin('users', 'meal_price.userId', 'users.id')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};

exports.updateReservedPrice = (req, res) => {
  const { id, reserveDate, mealPrice } = req.body;
  return knex('users')
    .where({ id })
    .update({ reservePrice: mealPrice, reserveDate })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};
