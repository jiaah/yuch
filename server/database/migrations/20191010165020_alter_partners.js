exports.up = knex => knex.schema.dropTableIfExists('employees');

exports.down = knex => {};
