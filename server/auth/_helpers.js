const bcrypt = require('bcryptjs');

function comparePass(userPassword, databasePassword) {
  console.log(
    'userPassword, databasePassword: ',
    userPassword,
    databasePassword,
  );

  return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = {
  comparePass,
};
