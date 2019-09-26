/* eslint-disable no-await-in-loop */
const moment = require('moment');
const Invoice = require('../models/Invoice');
const cateringService = require('../services/cateringService');
const specialService = require('../services/specialService');
const mealPriceService = require('../services/mealPriceService');
const userService = require('../services/userService');
const Users = require('../models/Users');

const Lists = async (startedAt, endedAt) => {
  try {
    const results = [];
    const users = await Users.query()
      .whereNot('username', 'yuch')
      .orderBy('companyName', 'asc');

    // eslint-disable-next-line no-restricted-syntax
    for (const user of users) {
      const mealPrice = await mealPriceService.getMealPriceByUserIdWithDate(
        user.id,
        endedAt,
      );
      const cateringSumTotal = await cateringService.getSumTotalByUserIdWithRangeDate(
        user.id,
        mealPrice,
        startedAt,
        endedAt,
      );

      const specialSumTotal = await specialService.getSumTotalByUserIdWithRangeDate(
        user.id,
        startedAt,
        endedAt,
      );

      const sumTotal = cateringSumTotal + specialSumTotal;

      if (await invoiceExist(user.id, startedAt)) {
        // update Invoice
        await Invoice.query()
          .update({
            mealPrice,
            sumTotal,
            updated_at: new Date().toISOString(),
          })
          .where({ userId: user.id, date: startedAt });
      } else {
        // save Invoice
        await Invoice.query().insert({
          userId: user.id,
          mealPrice,
          date: startedAt,
          sumTotal,
          updated_at: new Date().toISOString(),
        });
      }

      if (await userService.isActive) {
        results.push({
          userId: user.id,
          companyName: user.companyName,
          mealPrice,
          sumTotal,
        });
      }
    }

    return results;
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

const findOne = async (userId, startedAt, endedAt) => {
  try {
    const hasInvoice = await invoiceExist(userId, startedAt);
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
        'invoice.userId',
        'users.companyName',
        'invoice.mealPrice',
        'invoice.sumTotal',
      )
      .join('users', 'users.id', 'invoice.userId')
      .where({ userId, date: startedAt });
  } catch (error) {
    throw error;
  }
};

module.exports = { Lists, findOne };
