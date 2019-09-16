const knex = require('../database');
const util = require('../lib/util');
const mealPriceService = require('../services/mealPriceService');

/* --- Admin --- */
// admin profile
exports.getAdmin = (req, res) => {
  const id = req.params.id;
  knex('users')
    .where({ id })
    .first()
    .select('id', 'companyName', 'username', 'contactNo', 'email')
    .then(admin => res.status(200).json(admin))
    .catch(err => res.status(409).json(err));
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
      updated_at: new Date().toISOString(),
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
    companyName,
    username,
    password,
    contactNo,
    email,
    lunchQty,
    dinnerQty,
    lateNightSnackQty,
    bankAccountId,
    address,
    mealPrice,
    businessType,
  } = req.body.userInfo;
  return util.bcryptPassword(password).then(hashedPassword =>
    knex('users')
      .insert({
        companyName,
        username,
        password: hashedPassword,
        contactNo,
        email,
        lunchQty,
        dinnerQty,
        lateNightSnackQty,
        bankAccountId,
        address,
        businessType,
      })
      .returning('id')
      .then(user => {
        const userId = user[0];
        return knex('meal_price').insert({
          mealPrice,
          userId,
        });
      })
      .then(() => res.status(200).json())
      .catch(err => res.status(500).json(err)),
  );
};

exports.editUserByAdmin = (req, res) => {
  const userId = req.params.id;
  const {
    username,
    companyName,
    contactNo,
    email,
    lunchQty,
    dinnerQty,
    lateNightSnackQty,
    bankAccountId,
    address,
    businessType,
    // mealPrice,
    // nextMonth,
  } = req.body.userInfo;

  return (
    knex('users')
      .where({ id: userId })
      .first()
      .update({
        companyName,
        username,
        contactNo,
        email,
        lunchQty,
        dinnerQty,
        lateNightSnackQty,
        bankAccountId,
        address,
        businessType,
      })
      // .then(() =>
      //   knex('meal_price')
      //     .where({ userId })
      //     .first()
      //     .update({
      //       reservePrice: mealPrice,
      //       reserveDate: nextMonth,
      //     }),
      // )
      .then(() => res.status(200).json())
      .catch(err => res.status(500).json(err))
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
  knex('users')
    .whereNot('users.username', 'yuch')
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
      'users.lateNightSnackQty',
      'users.bankAccountId',
      'users.address',
      'users.businessType',
      'users.updated_at',
      'meal_price.mealPrice',
      'meal_price.reservePrice',
      'meal_price.reserveDate',
    )
    .leftJoin('meal_price', 'users.id', 'meal_price.userId')
    .orderBy('users.updated_at', 'desc')
    .then(users => {
      knex('bank_account')
        .select('*')
        .then(bankAccounts => res.status(200).json({ users, bankAccounts }))
        .catch(err => res.status(500).json(err));
    });
};

// get catering meal prices of all clients & users id, companyName*
exports.getCateringRates = (req, res) => {
  knex('meal_price')
    .whereNot('users.isAdmin', true)
    .whereRaw(
      'CURRENT_DATE BETWEEN meal_price."startedAt" AND meal_price."endedAt"',
    )
    .select(
      'meal_price.id',
      'meal_price.userId',
      'users.companyName',
      'meal_price.mealPrice',
      'meal_price.reservePrice',
      'meal_price.reserveDate',
      'meal_price.updated_at',
    )
    .leftJoin('users', 'meal_price.userId', 'users.id')
    .orderBy('meal_price.updated_at', 'desc')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
};

exports.updateReservedPrice = async (req, res, next) => {
  try {
    const { userId, reservePrice, reserveDate } = req.body;

    await mealPriceService.reserveMealPrice(userId, reservePrice, reserveDate);
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
