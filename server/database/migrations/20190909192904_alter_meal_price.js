exports.up = knex =>
  knex.schema.alterTable('meal_price', table => {
    table.datetime('startedAt', { useTz: true }).defaultTo(knex.fn.now(6));
    table
      .datetime('endedAt', { useTz: true })
      .defaultTo('9999-12-31 23:59:59.99999-00');
  });

exports.down = knex =>
  knex.schema.table('meal_price', table => {
    table.dropColumn('startedAt');
    table.dropColumn('endedAt');
  });
