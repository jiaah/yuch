const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function getRandomToken(user) {
  const tokenDetails = {
    id: user.id,
    username: user.username,
  };
  const token = jwt.sign(tokenDetails, process.env.JWT_KEY, {
    expiresIn: '24h',
  });

  return token;
}

function comparePassword(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  getRandomToken,
  comparePassword,
};
