exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('companyName')
        .unique()
        .notNullable();
      table
        .string('username')
        .unique()
        .notNullable();
      table.string('password').notNullable();
      table.string('contactNo').notNullable();
      table.string('email');
      table
        .boolean('isAdmin')
        .notNullable()
        .defaultTo(false);
      table.smallint('mealPrice');
      table.smallint('lunchQty');
      table.smallint('dinnerQty');
      table.smallint('bankAccountId').unsigned();
      table
        .foreign('bankAccountId')
        .references('id')
        .inTable('bankAccount');
      table
        .timestamp('createdAt')
        .notNullable()
        .defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable('users');
