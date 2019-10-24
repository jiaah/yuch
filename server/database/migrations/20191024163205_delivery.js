exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('delivery', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('route')
        .unique()
        .notNullable();
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('delivery');
