exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('catering', table => {
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
      table.date('date').defaultTo(null);
      table.integer('lunchQty').defaultTo(0);
      table.integer('dinnerQty').defaultTo(0);
      table.integer('lateNightSnackQty').defaultTo(0);
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('catering');
