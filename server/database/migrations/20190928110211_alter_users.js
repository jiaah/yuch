exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('note');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('note');
  });
