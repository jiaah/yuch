exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.date('endDate');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('endDate');
  });
