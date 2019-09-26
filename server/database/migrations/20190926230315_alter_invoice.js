exports.up = knex =>
  knex.schema.alterTable('invoice', table => {
    table
      .bigInteger('sumTotal')
      .defaultTo(0)
      .alter();
  });

exports.down = knex =>
  knex.schema.table('invoice', table => {
    table
      .integer('sumTotal')
      .defaultTo(0)
      .alter();
  });
