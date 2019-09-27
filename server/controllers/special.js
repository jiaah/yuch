const moment = require('moment');
const specialService = require('../services/specialService');

exports.getOne = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { date } = req.query;

    const parsedDate = moment(`${date}01`, 'YYYYMMDD');

    const startedAt = parsedDate.format('YYYY-MM-DD');
    const endedAt = parsedDate.endOf('month').format('YYYY-MM-DD');

    const result = await specialService.findAllByUserIdWithDateRange(
      userId,
      startedAt,
      endedAt,
    );

    return res.status(200).json(result);
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

    const results = await specialService.listsByDateRange(startedAt, endedAt);

    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      userId,
      companyName,
      contactNo,
      address,
      date,
      time,
      quantity,
      mealPrice,
    } = req.body;

    const parsedDate = moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm');
    const sumTotal = mealPrice * quantity;

    if (!userId || userId === 'null') {
      nullableUserId = null;
    } else {
      nullableUserId = userId;
    }

    changedDate = parsedDate.format('YYYY-MM-DD');
    changedTime = parsedDate.format('HH:mm:ss');

    const result = await specialService.create({
      userId: nullableUserId,
      companyName,
      contactNo,
      address,
      date: changedDate,
      time: changedTime,
      quantity,
      mealPrice,
      sumTotal,
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { specialId } = req.params;
    const {
      userId,
      companyName,
      contactNo,
      address,
      date,
      time,
      quantity,
      mealPrice,
    } = req.body;

    const isExist = await specialService.isExist(specialId);

    if (!isExist) {
      const error = new Error('Not Exist Special Meal');
      error.status = 404;
      throw error;
    }

    const parsedDate = moment(`${date} ${time}`, 'YYYYMMDD h:mm a');
    const sumTotal = mealPrice * quantity;
    if (!userId || userId === 'null') {
      nullableUserId = null;
    } else {
      nullableUserId = userId;
    }
    changedDate = parsedDate.format('YYYY-MM-DD');
    changedTime = parsedDate.format('HH:mm:ss');

    const result = await specialService.update(specialId, {
      userId: nullableUserId,
      companyName,
      contactNo,
      address,
      date: changedDate,
      time: changedTime,
      quantity,
      mealPrice,
      sumTotal,
    });

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    // const { date } = req.body;
    const { specialId } = req.params;
    const isExist = await specialService.isExist(specialId);

    if (!isExist) {
      const error = new Error('Not Exist Special Meal');
      error.status = 404;
      throw error;
    }

    await specialService.deleteById(specialId);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
