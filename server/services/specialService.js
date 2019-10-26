const moment = require('moment');
const { raw } = require('objection');
const Calendars = require('../models/Calendars');
const SpecialMeal = require('../models/SpecialMeal');
const BankAccount = require('../models/BankAccount');

const getListsByUserIdWithRangeDate = async (userId, startDate, endDate) => {
  // const results = Calendars.query()
  //   .select(
  //     raw('id').as('specialId'),
  //     'special_meal.date',
  //     'time',
  //     'mealPrice',
  //     'quantity',
  //     raw('("mealPrice" * "quantity")').as('sumTotal'),
  //   )
  //   .leftJoin('special_meal', qb => {
  //     qb.on('special_meal.date', '=', 'calendars.date').andOn(
  //       raw(`special_meal."userId" = '${userId}'`),
  //     );
  //   })
  //   .whereBetween('calendars.date', [startDate, endDate])
  //   .orderBy('calendars.date', 'asc');

  const results = await SpecialMeal.query()
    .select(
      raw('id').as('specialId'),
      'special_meal.date',
      'time',
      'mealPrice',
      'quantity',
      raw('("mealPrice" * "quantity")').as('sumTotal'),
    )
    .rightJoin('calendars', 'calendars.date', 'special_meal.date')
    .where({ userId })
    .whereBetween('special_meal.date', [startDate, endDate])
    .orderBy('special_meal.date', 'asc');

  results.map(result => formatDateTime(result));

  return results;
};

const getSumTotalByUserIdWithRangeDate = async (userId, startDate, endDate) => {
  try {
    const row = await SpecialMeal.query()
      .sum('sumTotal as sumTotal')
      .where({ userId })
      .whereBetween('date', [startDate, endDate])
      .first();

    return Number(row.sumTotal);
  } catch (error) {
    throw error;
  }
};

const formatDateTime = result => {
  const formatedResult = result;
  const parsedDate = moment(result.date);
  const parsedTime = moment(
    `${parsedDate.format('YYYY-MM-DD')} ${result.time}`,
  );
  formatedResult.date = parsedDate.format('YYYY-MM-DD');
  formatedResult.time = parsedTime.format('hh:mm');
  return formatedResult;
};

const formatDateTime2 = result => {
  const formatedResult = result;
  const parsedDate = moment(result.date);
  const parsedTime = moment(
    `${parsedDate.format('YYYY-MM-DD')} ${result.time}`,
  );
  formatedResult.date = parsedDate.format('YYYY-MM-DD');
  formatedResult.time = parsedTime.format('hh:mm');
  return formatedResult;
};

const findAllByUserIdWithDateRange = async (userId, startedAt, endedAt) => {
  try {
    const results = await SpecialMeal.query()
      .where({ userId })
      .whereBetween('date', [startedAt, endedAt])
      .orderBy('date', 'asc')
      .orderBy('time', 'asc');
    results.map(result => formatDateTime(result));
    return results;
  } catch (error) {
    throw error;
  }
};

const listsByDateRange = async (startedAt, endedAt) => {
  try {
    const result = {};
    result.specialMeal = await SpecialMeal.query()
      .select(
        'special_meal.id',
        'userId',
        'special_meal.companyName',
        'mealPrice',
        'date',
        'time',
        'sideDish',
        'quantity',
        'sumTotal',
        'special_meal.address',
        'special_meal.contactNo',
        'special_meal.note',
        raw('users.created_at').as('createdAt'),
      )
      .leftJoin('users', 'users.id', 'special_meal.userId')
      .whereBetween('date', [startedAt, endedAt])
      .orderBy('date', 'asc')
      .orderBy('time', 'asc');

    result.specialMeal.map(specialMeal => formatDateTime(specialMeal));

    result.bankAccounts = await BankAccount.query();

    return result;
  } catch (error) {
    throw error;
  }
};

const create = async data => {
  try {
    const result = await SpecialMeal.query().insertAndFetch(data);
    return formatDateTime(result);
  } catch (error) {
    throw error;
  }
};

const isExist = async id => {
  try {
    return Boolean(await SpecialMeal.query().findById(id));
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await SpecialMeal.query().patchAndFetchById(id, data);
    return formatDateTime(result);
  } catch (error) {
    throw error;
  }
};

const deleteById = async id => {
  try {
    return SpecialMeal.query().deleteById(id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getListsByUserIdWithRangeDate,
  getSumTotalByUserIdWithRangeDate,
  findAllByUserIdWithDateRange,
  listsByDateRange,
  create,
  update,
  isExist,
  deleteById,
};
