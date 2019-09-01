const Users = require('../models/Users');

exports.isValid = async id => {
  const user = await Users.query().findById(id);
  return !!user;
};

exports.findOneById = async id => Users.query().findById(id);
