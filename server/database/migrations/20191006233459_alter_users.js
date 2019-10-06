exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.date('startDate');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('startDate');
  });
