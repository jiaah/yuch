const moment = require('moment');
const Catering = require('../models/Catering');
const Users = require('../models/Users');

const findOneByUserIdWithDate = async (userId, date) => {
  try {
    const user = await Users.query()
      .findById(userId)
      .first();
    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');
    const dayOfWeek = parsedDate.day();
    let result = await Catering.query()
      .where({ userId, date: formatedDate })
      .first();

    if (!user) {
      throw new Error('Not Exists User');
    }

    if (!result) {
      if (![0, 6].includes(dayOfWeek)) {
        result = await Catering.query().insertAndFetch({
          userId,
          date: formatedDate,
          lunchQty: user.lunchQty,
          dinnerQty: user.dinnerQty,
          lateNightSnackQty: user.lateNightSnackQty,
        });
      } else {
        result = {
          userId,
          date: formatedDate,
          lunchQty: null,
          dinnerQty: null,
          lateNightSnackQty: null,
          created_at: null,
        };
      }
    }

    result.date = moment(result.date).format('YYYYMMDD');

    if (result.lunchQty === 0) {
      result.lunchQty = null;
    }

    if (result.dinnerQty === 0) {
      result.dinnerQty = null;
    }

    if (result.lateNightSnackQty === 0) {
      result.lateNightSnackQty = null;
    }

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
        result = await Catering.query().insertAndFetch({
          userId,
          date: formatedDate,
          lunchQty,
          dinnerQty,
          lateNightSnackQty,
        });
      }

      result.date = moment(result.date).format('YYYYMMDD');

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
      .orderBy('companyName', 'asc');

    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      // eslint-disable-next-line no-await-in-loop
      const result = await findOneByUserIdWithDate(user.id, date);
      results.push(
        Object.assign({}, result, { companyName: user.companyName }),
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
    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');
    await Catering.query()
      .patch({
        lunchQty: 0,
        dinnerQty: 0,
        lateNightSnackQty: 0,
        updated_at: new Date().toISOString(),
      })
      .where({ userId })
      .where('date', '>=', formatedDate);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findOneByUserIdWithDate,
  updateByUserIdWithDate,
  getLists,
  setLists,
  resetQty,
};
