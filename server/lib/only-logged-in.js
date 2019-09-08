const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json('No token provided');
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json('Invalid token');
    }
    req.userData = decoded;
    next();
  });
};
