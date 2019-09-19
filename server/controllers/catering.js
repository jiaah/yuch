const cateringService = require('../services/cateringService');
const userService = require('../services/userService');

exports.getOne = async (req, res, next) => {
  try {
    const { date } = req.query;
    const { userId } = req.params;

    const catering = await cateringService.findOneByUserIdWithDate(
      userId,
      date,
    );

    return res.status(200).json(catering);
  } catch (error) {
    next(error);
  }
};

exports.setOne = async (req, res, next) => {
  try {
    const { date, lunchQty, dinnerQty, lateNightSnackQty } = req.body;
    const { userId } = req.params;

    const catering = await cateringService.updateByUserIdWithDate(
      userId,
      date,
      lunchQty,
      dinnerQty,
      lateNightSnackQty,
    );

    return res.status(200).json(catering);
  } catch (error) {
    next(error);
  }
};

exports.getLists = async (req, res, next) => {
  try {
    const { date } = req.query;

    const caterings = await cateringService.getLists(date);

    return res.status(200).json(caterings);
  } catch (error) {
    next(error);
  }
};

exports.setBatch = async (req, res, next) => {
  try {
    const { date, data } = req.body;

    await cateringService.setLists(date, data);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};

exports.resetQty = async (req, res, next) => {
  try {
    const { date } = req.body;
    const { userId } = req.params;

    await cateringService.resetQty(userId, date);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
