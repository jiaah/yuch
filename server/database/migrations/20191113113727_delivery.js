exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('delivery', table => {
      table
        .uuid('id')
        .unique()
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('routeId')
        .references('id')
        .inTable('routes')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .index();
      table
        .uuid('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .index();
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('delivery');
