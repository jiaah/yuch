const moment = require('moment');
const { raw } = require('objection');
const Invoice = require('../models/Invoice');
const Calendars = require('../models/Calendars');
const SpecialMeal = require('../models/SpecialMeal');
const Catering = require('../models/Catering');

const reCalculateInvoice = async (startedAt, endedAt) => {
  try {
    await reCalculateInvoice(startedAt, endedAt);
  } catch (error) {
    throw error;
  }
};

const findAllByDate = async (startedAt, endedAt) => {
  try {
    // await initInvoice(userId, date);
  } catch (error) {
    throw error;
  }
};

const findOneByUserIdWithDate = async (userId, startedAt, endedAt) => {
  try {
    const hasInvoice = await invoiceExist(userId, startedAt);
    console.log('hasInvoice', hasInvoice);
    if (!hasInvoice) {
      const results = await invoiceInfo(userId, startedAt, endedAt);
      results.map(result => {
        const newResult = result;
        newResult.date = moment(result.date).format('YYYY-MM-DD');
        return newResult;
      });
      return results;

      // const data = {
      //   userId,
      // };
      // await Invoice.query().insert(data);
    }
    return Invoice.query()
      .select(
        'invoice.mealPrice',
        'invoice.sumTotal',
        'invoice.userId',
        'users.companyName',
      )
      .join('users', 'users.id', 'invoice.userId')
      .where({ userId, date: startedAt });
  } catch (error) {
    throw error;
  }
};

const invoiceExist = async (userId, date) => {
  try {
    const result = await Invoice.query()
      .where({ userId, date })
      .first();
    return !!result;
  } catch (error) {
    throw error;
  }
};

const invoiceInfo = async (userId, startedAt, endedAt) => {
  try {
    let sumTotal = 0;

    const calendars = await Calendars.query()
      .select('date', 'mealPrice')
      .joinRaw(
        `left join meal_price on meal_price."userId" = '${userId}' and calendars."date" BETWEEN meal_price."startedAt" AND meal_price."endedAt"`,
      )
      .whereBetween('date', [startedAt, endedAt]);

    // eslint-disable-next-line no-restricted-syntax
    for (const calendar of calendars) {
      let sumLunchQty = 0;
      let sumDinnerQty = 0;
      let sumLateNightSnackQty = 0;
      let sumSpecialTotal = 0;
      // eslint-disable-next-line no-await-in-loop
      const caterings = await Catering.query()
        .select(
          raw('coalesce("lunchQty", 0) as lunchQty'),
          raw('coalesce("dinnerQty", 0) as dinnerQty'),
          raw('coalesce("lateNightSnackQty", 0) as lateNightSnackQty'),
        )
        .where({
          userId,
          date: calendar.date,
        });

      // eslint-disable-next-line no-loop-func
      caterings.forEach(catering => {
        sumLunchQty += catering.lunchQty;
        sumDinnerQty += catering.dinnerQty;
        sumLateNightSnackQty += catering.lateNightSnackQty;
      });

      // eslint-disable-next-line no-await-in-loop
      const specialMeals = await SpecialMeal.query()
        .select('sumTotal')
        .where({
          userId,
          date: calendar.date,
        });

      // eslint-disable-next-line no-loop-func
      specialMeals.forEach(specialMeal => {
        sumSpecialTotal += specialMeal.sumTotal;
      });

      sumTotal =
        (sumLunchQty + sumDinnerQty + sumLateNightSnackQty) *
          calendar.mealPrice +
        sumSpecialTotal;
    }

    // mealPrice
    // const mealPrice = await mealPriceService.findOneByUserIdWithDateRange(
    //   userId,
    //   startedAt,
    //   endedAt,
    // );

    // console.log('startedAt', startedAt);
    // console.log('endedAt', endedAt);

    // const query = `
    //   select calendars.date, meal_price."mealPrice"
    //   from calendars
    //   left join meal_price on meal_price."userId" = ? and calendars."date" BETWEEN meal_price."startedAt" AND meal_price."endedAt"
    //   where calendars."date" BETWEEN ? AND ?
    // `;

    // const query = `
    //   select calendars.date
    //   from calendars
    //   where calendars."date" BETWEEN ? AND ?
    // `;

    // const result = await knex.raw(query, [userId, startedAt, endedAt]);

    // const result = await Calendars.query().where('date', '=', startedAt);

    // const result = await Calendars.query()
    //   .select('date')
    //   .select(
    //     raw(
    //       `coalesce((select catering."lunchQty" from catering where catering.date = calendars.date and catering."userId" = '${userId}' limit 1 ), 0) * meal_price."mealPrice" as lunchQty`,
    //     ),
    //     raw(
    //       `coalesce((select catering."dinnerQty" from catering where catering.date = calendars.date and catering."userId" = '${userId}' limit 1 ), 0) * meal_price."mealPrice" as dinnerQty`,
    //     ),
    //     raw(
    //       `coalesce((select catering."lateNightSnackQty" from catering where catering.date = calendars.date and catering."userId" = '${userId}' limit 1 ), 0) as lateNightSnackQty`,
    //     ),
    //   )
    //   .joinRaw(
    //     `left join catering on catering."userId" = '${userId}' and catering.date = calendars.date`,
    //   )
    //   .joinRaw(
    //     `left join meal_price on meal_price."userId" = '${userId}' and calendars."date" BETWEEN meal_price."startedAt" AND meal_price."endedAt"`,
    //   )
    //   .whereBetween('date', [startedAt, endedAt]);
    // console.log(result);

    return calendars;
  } catch (error) {
    throw error;
  }
};

module.exports = { reCalculateInvoice, findAllByDate, findOneByUserIdWithDate };
