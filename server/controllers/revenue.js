const moment = require('moment');
const revenueService = require('../services/revenueService');

exports.getOne = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    const parsedDate = moment(`${date}01`, 'YYYYMMDD');

    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = parsedDate.endOf('month').format('YYYY-MM-DD');

    const result = await revenueService.findAllByUserIdWithDateRange(
      userId,
      startedAt,
      endedAt,
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
