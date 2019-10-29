exports.up = knex => knex.schema.dropTableIfExists('delivery');

exports.down = knex => {};
