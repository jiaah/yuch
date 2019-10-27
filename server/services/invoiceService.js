/* eslint-disable no-await-in-loop */
const { raw } = require('objection');
const Invoice = require('../models/Invoice');
const cateringService = require('../services/cateringService');
const specialService = require('../services/specialService');
const mealPriceService = require('../services/mealPriceService');
const bankAccountService = require('../services/bankAccountService');
const Users = require('../models/Users');

const Lists = async (date, startedAt, endedAt) => {
  try {
    const results = [];
    const users = await Users.query()
      .whereNot('username', 'yuch')

      .whereRaw(`to_char("startDate", 'YYYYMM') <= '${date}'`)
      .whereRaw(`to_char("endDate", 'YYYYMM') >= '${date}'`)
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

      // const specialSumTotal = await specialService.getSumTotalByUserIdWithRangeDate(
      //   user.id,
      //   startedAt,
      //   endedAt,
      // );

      // const sumTotal = cateringSumTotal + specialSumTotal;
      const sumTotal = cateringSumTotal;

      if (await invoiceExist(user.id, startedAt)) {
        // update Invoice
        await Invoice.query()
          .update({
            mealPrice,
            sumTotal: cateringSumTotal,
            updated_at: new Date().toISOString(),
          })
          .where({ userId: user.id, date: startedAt });
      } else {
        // save Invoice
        await Invoice.query().insert({
          userId: user.id,
          mealPrice,
          date: startedAt,
          sumTotal: cateringSumTotal,
          updated_at: new Date().toISOString(),
        });
      }

      results.push({
        userId: user.id,
        companyName: user.companyName,
        mealPrice,
        sumTotal,
      });
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
    const user = await Users.query()
      .select(
        'companyName',
        'bankAccountId',
        raw('to_char("startDate", \'YYYYMMDD\')').as('startDate'),
      )
      .where({ id: userId })
      .first();

    const result = { companyName: user.companyName, startDate: user.startDate };

    result.userId = userId;
    result.mealPrice = await mealPriceService.getMealPriceByUserIdWithDate(
      userId,
      endedAt,
    );

    const bankAccount = await bankAccountService.getOneById(user.bankAccountId);

    if (bankAccount) {
      result.bankAccount = bankAccount;
    } else {
      result.bankAccount = null;
    }

    const cateringSumTotal = await cateringService.getSumTotalByUserIdWithRangeDate(
      userId,
      result.mealPrice,
      startedAt,
      endedAt,
    );

    // const specialSumTotal = await specialService.getSumTotalByUserIdWithRangeDate(
    //   userId,
    //   startedAt,
    //   endedAt,
    // );

    // result.sumTotal = cateringSumTotal + specialSumTotal;
    result.sumTotal = cateringSumTotal;

    const invoice = await Invoice.query()
      .where({ userId, date: startedAt })
      .first();

    if (!invoice) {
      // insert Invoice
      await Invoice.query().insert({
        userId,
        mealPrice: result.mealPrice,
        date: startedAt,
        sumTotal: cateringSumTotal,
        updated_at: new Date().toISOString(),
      });

      // result.invoice = {
      //   invoiceId: insertedInvoice.id,
      //   mealPrice: result.mealPrice,
      //   sumTotal: cateringSumTotal,
      // };
    }

    result.caterings = await cateringService.getListsByUserIdWithRangeDate(
      userId,
      startedAt,
      endedAt,
    );

    // result.specialMeals = await specialService.getListsByUserIdWithRangeDate(
    //   userId,
    //   startedAt,
    //   endedAt,
    // );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { Lists, findOne };
