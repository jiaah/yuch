/* eslint-disable no-await-in-loop */
const moment = require('moment');
const { raw } = require('objection');
const SpecialMeal = require('../models/SpecialMeal');
const Invoice = require('../models/Invoice');
const Calendars = require('../models/Calendars');
const Restaurant = require('../models/Restaurant');

const getRevenues = async (startDate, endDate) => {
  try {
    const results = [];
    const calrendars = await Calendars.query()
      .select(raw('min(date)').as('date'))
      .whereRaw(`date BETWEEN '${startDate}' AND '${endDate}'`)
      .groupByRaw("to_char(date, 'YYYY-MM')")
      .orderBy('date', 'asc');

    // eslint-disable-next-line no-restricted-syntax
    for (const { date } of calrendars) {
      const subStartDate = moment(date).format('YYYY-MM-DD');
      const subEndDate = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD');
      const sumTotalInvoiceRestaurant = await getSumTotalInvoice(
        subStartDate,
        'restaurant',
      );
      const sumTotalResto =
        (await getSumTotalResto(subStartDate, subEndDate)) +
        sumTotalInvoiceRestaurant;

      // const sumTotalSpecialMeal = await getSumTotalSpecialMeal(
      //   subStartDate,
      //   subEndDate,
      //   true,
      // );

      // const sumTotalInvoiceSpecialMeal = await getSumTotalSpecialMeal(
      //   subStartDate,
      //   subEndDate,
      //   false,
      // );

      const sumTotalSpecialMeal = await getSumTotalSpecialMeal(
        subStartDate,
        subEndDate,
      );

      // const sumTotalInvoice =
      //   (await getSumTotalInvoice(subStartDate, 'catering')) +
      //   sumTotalInvoiceSpecialMeal;

      const sumTotalInvoice = await getSumTotalInvoice(
        subStartDate,
        'catering',
      );

      const sumTotal = sumTotalResto + sumTotalSpecialMeal + sumTotalInvoice;

      const result = {
        date: moment(date).format('YYYYMM'),
        sumTotalResto,
        sumTotalSpecialMeal,
        sumTotalInvoice,
        sumTotal,
      };
      results.push(result);
    }
    return results;
  } catch (error) {
    throw error;
  }
};

const getTotalRevenues = async (startDate, endDate) => {
  try {
    const results = [];
    const calrendars = await Calendars.query()
      .select(raw('min(date)').as('date'))
      .whereRaw(`date BETWEEN '${startDate}' AND '${endDate}'`)
      .groupByRaw("to_char(date, 'YYYY-MM')")
      .orderBy('date', 'asc');

    // eslint-disable-next-line no-restricted-syntax
    for (const { date } of calrendars) {
      const subStartDate = moment(date).format('YYYY-MM-DD');
      const subEndDate = moment(date)
        .endOf('month')
        .format('YYYY-MM-DD');
      const sumTotalInvoiceRestaurant = await getSumTotalInvoice(
        subStartDate,
        'restaurant',
      );
      const sumTotalResto =
        (await getSumTotalResto(subStartDate, subEndDate)) +
        sumTotalInvoiceRestaurant;

      const sumTotalSpecialMeal = await getSumTotalSpecialMeal(
        subStartDate,
        subEndDate,
      );

      const sumTotalInvoice = await getSumTotalInvoice(
        subStartDate,
        'catering',
      );

      const sumTotal = sumTotalResto + sumTotalSpecialMeal + sumTotalInvoice;

      const result = {
        date: moment(date).format('YYYYMM'),
        sumTotalResto,
        sumTotalSpecialMeal,
        sumTotalInvoice,
        sumTotal,
      };
      results.push(result);
    }

    return results;
  } catch (error) {
    throw error;
  }
};

const getSumTotalResto = async (startDate, endDate) => {
  const result = await Restaurant.query()
    .select(raw('sum(lunch + dinner)').as('sumTotal'))
    .whereRaw(`date BETWEEN '${startDate}' AND '${endDate}'`)
    .first();

  return Number(result.sumTotal) || 0;
};

// const getSumTotalSpecialMeal = async (startDate, endDate, isUserIdRequired) => {
//   try {
//     const qb = SpecialMeal.query()
//       .select(raw('sum("sumTotal")').as('sumTotal'))
//       .whereRaw(`date BETWEEN '${startDate}' AND '${endDate}'`);

//     if (isUserIdRequired) {
//       qb.whereNotNull('userId');
//     } else {
//       qb.whereNull('userId');
//     }

//     const result = await qb.first();
//     return Number(result.sumTotal) || 0;
//   } catch (error) {
//     throw error;
//   }
// };

const getSumTotalSpecialMeal = async (startDate, endDate) => {
  try {
    const result = await SpecialMeal.query()
      .select(raw('sum("sumTotal")').as('sumTotal'))
      .whereRaw(`date BETWEEN '${startDate}' AND '${endDate}'`)
      .first();

    return Number(result.sumTotal) || 0;
  } catch (error) {
    throw error;
  }
};

const getSumTotalInvoice = async (date, businessType) => {
  try {
    const result = await Invoice.query()
      .select(raw('sum("sumTotal")').as('sumTotal'))
      .innerJoin('users', 'users.id', 'invoice.userId')
      .where({ date, businessType })
      .first();

    return Number(result.sumTotal) || 0;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRevenues,
  getTotalRevenues,
};
