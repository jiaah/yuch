const knex = require('../database');

exports.isValid = async id => {
  const user = await knex('users')
    .where({ id })
    .first();
  return !!user;
};

exports.findOneById = async id =>
  knex('users')
    .where({ id })
    .first();
