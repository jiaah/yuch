exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('yuch_revenue', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.date('date').defaultTo(null);
      table.integer('sumTotal').defaultTo(0);
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('yuch_revenue');
