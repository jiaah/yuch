exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('special_meal', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .uuid('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .index();
      table.integer('mealPrice').defaultTo(0);
      table.date('date').defaultTo(null);
      table.time('time').defaultTo(null);
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('special_meal');
