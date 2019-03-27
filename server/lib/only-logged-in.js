const jwt = require('jsonwebtoken');

const onlyLoggedIn = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).json('No token provided');
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json('Unauthorized access');
    }
    req.userData = decoded;
    next();
  });
};

module.exports = onlyLoggedIn;
