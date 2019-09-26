const moment = require('moment');
const Restaurant = require('../models/Restaurant');

const findOneByDate = async date => {
  try {
    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');
    const lastMonthFormatedDate = parsedDate
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    // let result = await Restaurant.query()
    //   .select('date', 'lunch', 'dinner')
    //   .where({ date: formatedDate })
    //   .first();

    // if (result) {
    //   result.date = moment(result.date).format('YYYYMMDD');
    // } else {
    const result = await Restaurant.query()
      .select('date', 'lunch', 'dinner')
      .whereRaw(`date BETWEEN '${lastMonthFormatedDate}' AND '${formatedDate}'`)
      .orderBy('date', 'asc');

    result.map(obj => {
      const newResult = obj;
      newResult.date = moment(newResult.date).format('YYYYMMDD');
      return newResult;
    });
    // }

    return result;
  } catch (error) {
    throw error;
  }
};

const updateByDate = async (date, lunch, dinner) => {
  try {
    let result;

    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');

    const restaurant = await Restaurant.query()
      .where({ date: formatedDate })
      .first();

    if (restaurant) {
      await Restaurant.query()
        .where({ date: formatedDate })
        .patch({
          lunch,
          dinner,
          updated_at: new Date().toISOString(),
        });
      result = await findOneByDate(date);
    } else {
      result = await Restaurant.query().insertAndFetch({
        date: formatedDate,
        lunch,
        dinner,
      });
    }

    result.date = moment(result.date).format('YYYYMMDD');

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findOneByDate,
  updateByDate,
};
