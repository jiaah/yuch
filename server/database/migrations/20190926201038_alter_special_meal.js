exports.up = knex =>
  knex.schema.alterTable('special_meal', table => {
    table.string('note');
    table.integer('sideDish').defaultTo(null);
  });

exports.down = knex =>
  knex.schema.table('special_meal', table => {
    table.dropColumn('note');
    table.dropColumn('sideDish');
  });
