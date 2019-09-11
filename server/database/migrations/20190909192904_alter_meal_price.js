exports.up = knex =>
  knex.schema.alterTable('meal_price', table => {
    table.date('startedAt').defaultTo(knex.raw('current_date'));
    table.date('endedAt').defaultTo('9999-12-31');
  });

exports.down = knex =>
  knex.schema.table('meal_price', table => {
    table.dropColumn('startedAt');
    table.dropColumn('endedAt');
  });
