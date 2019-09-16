// const moment = require('moment');
const cateringService = require('../services/cateringService');
// const userService = require('../services/userService');

exports.getLists = async (req, res, next) => {
  try {
    const { date } = req.body;

    // 관리자 체크
    if (!req.userData.isAdmin) {
      const error = new Error('Not Admin');
      error.status = 401;
      throw error;
    }

    const caterings = cateringService.getLists(date);

    return res.status(200).json(caterings);
  } catch (error) {
    next(error);
  }
};
