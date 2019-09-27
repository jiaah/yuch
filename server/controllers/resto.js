const restoService = require('../services/restoService');

exports.getOne = async (req, res, next) => {
  try {
    const { date } = req.query;

    const catering = await restoService.findOneByDate(date);

    return res.status(200).json(catering);
  } catch (error) {
    next(error);
  }
};

exports.setOne = async (req, res, next) => {
  try {
    const { date } = req.body;
    const lunch = req.body.lunch || 0;
    const dinner = req.body.lunch || 0;
    const catering = await restoService.updateByDate(date, lunch, dinner);

    return res.status(200).json(catering);
  } catch (error) {
    next(error);
  }
};
