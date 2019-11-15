exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table
      .integer('lateNightSnackQty')
      .defaultTo(null)
      .alter();
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.string('lateNightSnackQty').alter();
  });
