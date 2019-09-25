const userService = require('../services/userService');

module.exports = async (req, res, next) => {
  const isActive = await userService.isActive(decoded.id);

  // 회원 활성화 체크
  if (!isActive) {
    return res.status(401).json('Inactive user');
  }

  next();
};
