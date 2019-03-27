const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getRandomToken = function getRandomToken(user) {
  return new Promise((resolve, reject) => {
    const tokenDetails = {
      id: user.id,
      username: user.username,
    };
    const token = jwt.sign(tokenDetails, process.env.JWT_KEY, {
      expiresIn: '1h',
    });
    if (token === '' || token === undefined) {
      reject(new Error('Failed to create token.'));
    }
    resolve(token);
  });
};

exports.comparePassword = function comparePassword(
  userPassword,
  databasePassword,
) {
  return bcrypt.compareSync(userPassword, databasePassword);
};

exports.bcryptPassword = function bcryptPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (hashedPassword === '' || hashedPassword === undefined) {
      reject(new Error('Bcrypt Password Failed'));
    }
    resolve(hashedPassword);
  });
};
