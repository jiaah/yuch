const moment = require('moment');
const { transaction } = require('objection');
const MealPrice = require('../models/MealPrice');

const reserveMealPrice = async (userId, mealPrice, reserveDate) => {
  try {
    const maxEndedAt = '9999-12-31';
    return transaction(MealPrice.knex(), async trx => {
      // find
      const row = await MealPrice.query(trx)
        .where({ userId })
        .whereRaw(`'${reserveDate}' BETWEEN "startedAt" AND "endedAt"`)
        .first();
      if (row) {
        row.startedAt = moment(row.startedAt).format('YYYY-MM-DD');
        row.endedAt = moment(row.endedAt).format('YYYY-MM-DD');

        if (row.startedAt === reserveDate) {
          // update mealPrice on currentPrice
          await MealPrice.query(trx)
            .findById(row.id)
            .patch({ mealPrice });
        } else {
          let endedAt;
          const prevEndedAt = moment(reserveDate, 'YYYY-MM-DD')
            .subtract(1, 'days')
            .endOf('month');
          if (row.endedAt === maxEndedAt) {
            endedAt = maxEndedAt;
          } else {
            const prevStartedAt = moment(row.endedAt, 'YYYY-MM-DD')
              .subtract(1, 'days')
              .endOf('month');
            endedAt = prevStartedAt.format('YYYY-MM-DD');
          }
          // insert new record
          await MealPrice.query(trx).insert({
            mealPrice,
            userId,
            startedAt: reserveDate,
            endedAt,
          });
          // update prev record if exists
          await MealPrice.query(trx)
            .findById(row.id)
            .patch({ endedAt: prevEndedAt });
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  reserveMealPrice,
};
