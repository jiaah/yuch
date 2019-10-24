exports.up = knex =>
  knex.schema.alterTable('employees', table => {
    table.string('position').defaultTo('');
  });

exports.down = knex =>
  knex.schema.table('employees', table => {
    table.dropColumn('position');
  });
