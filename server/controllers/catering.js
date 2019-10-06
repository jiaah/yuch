const moment = require('moment');
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

    // const parsedDate = moment(date, 'YYYYMMDD');
    // const formatedDate = parsedDate.format('YYYY-MM-DD');

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
    const { date, endService } = req.body;
    const { userId } = req.params;

    const parsedDate = moment(date, 'YYYYMMDD');
    const formatedDate = parsedDate.format('YYYY-MM-DD');

    if (endService) {
      // inactive of user service
      await userService.inActive(userId, formatedDate);
      await cateringService.resetQty(userId, formatedDate);
    } else {
      // active of user service
      await userService.active(userId);
    }

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
