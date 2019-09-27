const moment = require('moment');
const { raw } = require('objection');
const SpecialMeal = require('../models/SpecialMeal');

const getListsByUserIdWithRangeDate = async (userId, startDate, endDate) => {
  const results = await SpecialMeal.query()
    .select(
      raw('id').as('specialId'),
      'date',
      'time',
      'mealPrice',
      'quantity',
      raw('("mealPrice" * "quantity")').as('sumTotal'),
    )
    .where({ userId })
    .whereBetween('date', [startDate, endDate])
    .orderBy('date', 'asc');

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
    const results = await SpecialMeal.query()
      .select(
        'id',
        'userId',
        'companyName',
        'mealPrice',
        'date',
        'time',
        'sideDish',
        'quantity',
        'sumTotal',
        'address',
        'contactNo',
        'note',
      )
      .whereBetween('date', [startedAt, endedAt])
      .orderBy('date', 'asc')
      .orderBy('time', 'asc');

    results.map(result => formatDateTime(result));

    return results;
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
