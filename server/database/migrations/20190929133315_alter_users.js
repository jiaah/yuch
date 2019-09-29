exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('account');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('account');
  });
