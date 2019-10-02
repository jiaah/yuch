exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table.string('businessNo').defaultTo('');
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('businessNo');
  });
