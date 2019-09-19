const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  const isAdmin = await userService.isAdmin(req.userData.id);

  // 관리자 체크
  if (!isAdmin) {
    return res.status(401).json('Not Admin');
  }

  next();
};
