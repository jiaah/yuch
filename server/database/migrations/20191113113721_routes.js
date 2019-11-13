exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('routes', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('route')
        .unique()
        .notNullable();
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('routes');
