const jwt = require('jsonwebtoken');
// const userService = require('../services/userService');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json('No token provided');
  }

  jwt.verify(token, process.env.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).json('Invalid token');
    }

    // const isActive = await userService.isActive(decoded.id);
    // if (!isActive) {
    //   return res.status(401).json('Inactivated user');
    // }

    req.userData = decoded;

    next();
  });
};
