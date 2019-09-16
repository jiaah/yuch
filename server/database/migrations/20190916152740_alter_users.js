exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('lateNightSnackQty');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('lateNightSnackQty');
  });
