exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table
      .date('endDate')
      .defaultTo('9999-12-31')
      .alter();
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table
      .date('endDate')
      .defaultTo(null)
      .alter();
  });
