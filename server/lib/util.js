const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// used for login & find password
exports.getRandomToken = function getRandomToken(user) {
  return new Promise((resolve, reject) => {
    const tokenDetails = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(tokenDetails, process.env.secret, {
      expiresIn: '1h',
    });
    if (token === '' || token === undefined) {
      reject(new Error('Failed to create token'));
    }
    resolve(token);
  });
};

// check if reset password token is valid
exports.isValidToken = function isValidToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        reject(new Error('Unauthorized access'));
      }
      req.userData = decoded;
      console.log('decoded: ', decoded);
      resolve(true);
    });
  });
};

exports.comparePassword = function comparePassword(
  userPassword,
  databasePassword,
) {
  return bcrypt.compare(userPassword, databasePassword);
};

exports.bcryptPassword = function bcryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(new Error('Auth failed'));
        }
        resolve(hash);
      });
    });
  });
};
