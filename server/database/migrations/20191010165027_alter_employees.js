exports.up = knex => knex.schema.dropTableIfExists('partners');

exports.down = knex => {};
