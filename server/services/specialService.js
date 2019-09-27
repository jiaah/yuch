const moment = require('moment');
const SpecialMeal = require('../models/SpecialMeal');
// const Users = require('../models/Users');

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
  formatedResult.date = parsedDate.format('YYYYMMDD');
  formatedResult.time = parsedTime.format('h:mm a');
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
    return formatDateTime2(result);
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
  getSumTotalByUserIdWithRangeDate,
  findAllByUserIdWithDateRange,
  listsByDateRange,
  create,
  update,
  isExist,
  deleteById,
};
