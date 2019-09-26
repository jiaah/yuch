const moment = require('moment');
const invoiceService = require('../services/invoiceService');

exports.update = async (req, res, next) => {
  try {
    const { date } = req.query;

    const parsedDate = moment(`${date}01`, 'YYYYMMDD');
    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = parsedDate.endOf('month').format('YYYY-MM-DD');

    await invoiceService.Lists(startedAt, endedAt);

    return res.status(200).json({});
  } catch (error) {
    next(error);
  }
};

exports.lists = async (req, res, next) => {
  try {
    const { date } = req.query;

    const parsedDate = moment(`${date}01`, 'YYYYMMDD');
    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = parsedDate.endOf('month').format('YYYY-MM-DD');

    const results = await invoiceService.Lists(startedAt, endedAt);

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    const parsedDate = moment(`${date}01`, 'YYYYMMDD');
    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = parsedDate.endOf('month').format('YYYY-MM-DD');

    const result = await invoiceService.findOneByUserIdWithDate(
      userId,
      startedAt,
      endedAt,
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
