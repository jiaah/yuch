const moment = require('moment');
const revenueService = require('../services/revenueService');

exports.listsByMonthly = async (req, res, next) => {
  try {
    const { date } = req.query;

    const parsedDate = moment(`${date}0101`, 'YYYYMMDD');

    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');

    const result = await revenueService.getRevenues(startedAt, endedAt);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.listsYuchByMonthly = async (req, res, next) => {
  try {
    const { date } = req.query;

    const parsedDate = moment(`${date}0101`, 'YYYYMMDD');

    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = moment()
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');

    const result = await revenueService.getTotalRevenues(startedAt, endedAt);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
