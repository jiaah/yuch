exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('meal_price', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.integer('mealPrice').defaultTo(null);
      table.integer('reservePrice').defaultTo(null);
      table.string('reserveDate').defaultTo('');
      table
        .uuid('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('RESTRICT')
        .index();
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('meal_price');
