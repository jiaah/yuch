exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('menu', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('lunch').defaultTo('');
      table.string('dinner').defaultTo('');
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('menu');
