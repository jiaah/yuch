const moment = require('moment');
const { raw } = require('objection');
const Catering = require('../models/Catering');
const Users = require('../models/Users');

const getListsByUserIdWithRangeDate = async (userId, startDate, endDate) =>
  Catering.query()
    .select(
      raw('to_char("date", \'YYYYMMDD\')').as('date'),
      'lunchQty',
      'dinnerQty',
      'lateNightSnackQty',
    )
    .where({ userId })
    .whereBetween('date', [startDate, endDate])
    .orderBy('date', 'asc');

const getSumTotalByUserIdWithRangeDate = async (
  userId,
  mealPrice,
  startDate,
  endDate,
) => {
  try {
    const row = await Catering.query()
      .sum('lunchQty as lunchQty')
      .sum('dinnerQty as dinnerQty')
      .sum('lateNightSnackQty as lateNightSnackQty')
      .where({ userId })
      .whereBetween('date', [startDate, endDate])
      .first();
    let lunchQty = 0;
    let dinnerQty = 0;
    let lateNightSnackQty = 0;
    if (row) {
      lunchQty = Number(row.lunchQty);
      dinnerQty = Number(row.dinnerQty);
      lateNightSnackQty = Number(row.lateNightSnackQty);
    }

    return (lunchQty + dinnerQty + lateNightSnackQty) * mealPrice;
  } catch (error) {
    throw error;
  }
};

const findOneByUserIdWithDate = async (userId, date) => {
  try {
    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');

    const dayOfWeek = parsedDate.day();

    const user = await Users.query()
      .findById(userId)
      .first();

    if (!user) {
      throw new Error('Not Exists User');
    }

    let result = await Catering.query()
      .select(
        'catering.userId',
        'users.companyName',
        'catering.date',
        'catering.lunchQty',
        'catering.dinnerQty',
        'catering.lateNightSnackQty',
        raw('to_char("startDate", \'YYYYMMDD\')').as('startDate'),
        raw('to_char("endDate", \'YYYYMMDD\')').as('endDate'),
        // raw('users.created_at').as('createdAt'),
      )
      .innerJoin('users', 'users.id', 'catering.userId')
      .where({ userId, date: formatedDate })
      .first();

    if (!result) {
      if (![0, 6].includes(dayOfWeek)) {
        await Catering.query().insert({
          userId,
          date: formatedDate,
          lunchQty: user.lunchQty,
          dinnerQty: user.dinnerQty,
          lateNightSnackQty: user.lateNightSnackQty,
        });
        result = await Catering.query()
          .select(
            'catering.userId',
            'users.companyName',
            'catering.date',
            'catering.lunchQty',
            'catering.dinnerQty',
            'catering.lateNightSnackQty',
            raw('to_char("startDate", \'YYYYMMDD\')').as('startDate'),
            raw('to_char("endDate", \'YYYYMMDD\')').as('endDate'),
            // raw('users.created_at').as('createdAt'),
          )
          .innerJoin('users', 'users.id', 'catering.userId')
          .where({ userId, date: formatedDate })
          .first();
      } else {
        result = {
          userId,
          date: formatedDate,
          lunchQty: null,
          dinnerQty: null,
          lateNightSnackQty: null,
          // createdAt: null,
        };
      }
    }

    result.date = moment(result.date).format('YYYYMMDD');
    result.endDate = user.endDate
      ? moment(user.endDate).format('YYYYMMDD')
      : null;

    if (result.lunchQty === 0) {
      result.lunchQty = null;
    }

    if (result.dinnerQty === 0) {
      result.dinnerQty = null;
    }

    if (result.lateNightSnackQty === 0) {
      result.lateNightSnackQty = null;
    }

    // console.log(result);

    return result;
  } catch (error) {
    throw error;
  }
};

const updateByUserIdWithDate = async (
  userId,
  date,
  lunchQty,
  dinnerQty,
  lateNightSnackQty,
) => {
  try {
    let result;

    const user = await Users.query().findById(userId);
    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');

    if (user) {
      const catering = await Catering.query()
        .select(
          'catering.userId',
          'users.companyName',
          'catering.date',
          'catering.lunchQty',
          'catering.dinnerQty',
          'catering.lateNightSnackQty',
          'users.endDate',
          raw('users.created_at').as('createdAt'),
        )
        .innerJoin('users', 'users.id', 'catering.userId')
        .where({ userId, date: formatedDate })
        .first();

      if (catering) {
        await Catering.query()
          .where({ userId, date: formatedDate })
          .patch({
            lunchQty,
            dinnerQty,
            lateNightSnackQty,
            updated_at: new Date().toISOString(),
          });
        result = await findOneByUserIdWithDate(userId, date);
      } else {
        await Catering.query().insert({
          userId,
          date: formatedDate,
          lunchQty,
          dinnerQty,
          lateNightSnackQty,
        });
        result = await Catering.query()
          .select(
            'catering.userId',
            'users.companyName',
            'catering.date',
            'catering.lunchQty',
            'catering.dinnerQty',
            'catering.lateNightSnackQty',
            'users.endDate',
            raw('users.created_at').as('createdAt'),
          )
          .innerJoin('users', 'users.id', 'catering.userId')
          .where({ userId, date: formatedDate })
          .first();
      }

      result.date = moment(result.date).format('YYYYMMDD');
      result.endDate = user.endDate
        ? moment(user.endDate).format('YYYYMMDD')
        : null;

      if (result.lunchQty === 0) {
        result.lunchQty = null;
      }

      if (result.dinnerQty === 0) {
        result.dinnerQty = null;
      }

      if (result.lateNightSnackQty === 0) {
        result.lateNightSnackQty = null;
      }
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const getLists = async date => {
  try {
    const results = [];
    const users = await Users.query()
      .where({ isAdmin: false, businessType: 'catering' })
      .where(builder => {
        builder.whereRaw('"endDate" >= NOW()').orWhereNull('endDate');
      })
      .orderBy('companyName', 'asc');

    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      const result = await findOneByUserIdWithDate(user.id, date);
      results.push(
        Object.assign({}, result, {
          companyName: user.companyName,
          endDate: user.endDate
            ? moment(user.endDate).format('YYYYMMDD')
            : null,
        }),
      );
    }

    return results;
  } catch (error) {
    throw error;
  }
};

const setLists = async (date, data) => {
  try {
    let parsedData;

    if (typeof data === 'string') {
      parsedData = JSON.parse(data);
    } else {
      parsedData = data;
    }

    parsedData.forEach(async datum => {
      await updateByUserIdWithDate(
        datum.userId,
        date,
        datum.lunchQty,
        datum.dinnerQty,
        datum.lateNightSnackQty,
      );
    });
  } catch (error) {
    throw error;
  }
};

const resetQty = async (userId, date) => {
  try {
    await Catering.query()
      .delete()
      .where({ userId })
      .where('date', '>=', date);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getListsByUserIdWithRangeDate,
  getSumTotalByUserIdWithRangeDate,
  findOneByUserIdWithDate,
  updateByUserIdWithDate,
  getLists,
  setLists,
  resetQty,
};
