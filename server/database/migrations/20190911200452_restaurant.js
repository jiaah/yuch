exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('restaurant', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.date('date').defaultTo(null);
      table.integer('lunch').defaultTo(0);
      table.integer('dinner').defaultTo(0);
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('restaurant');
