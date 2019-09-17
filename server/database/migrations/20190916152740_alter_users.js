exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('lateNightSnackQty').defaultTo(null);
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('lateNightSnackQty');
  });
