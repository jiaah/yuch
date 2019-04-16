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
        .string('company_name')
        .unique()
        .notNullable();
      table
        .string('username')
        .unique()
        .notNullable();
      table.string('password').notNullable();
      table.string('contact_no').notNullable();
      table.string('email');
      table
        .boolean('is_admin')
        .notNullable()
        .defaultTo(false);
      table.smallint('meal_price');
      table.smallint('init_lunch_quantity');
      table.smallint('init_dinner_quantity');
      table.smallint('bank_account_id').unsigned();
      table
        .foreign('bank_account_id')
        .references('id')
        .inTable('bank_account');
      table
        .timestamp('created_at')
        .notNullable()
        .defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable('users');
