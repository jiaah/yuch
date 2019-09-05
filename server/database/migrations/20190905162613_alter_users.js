exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('refreshToken');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('refreshToken');
  });
