exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('bank_account', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('bankName').notNullable();
      table.string('accountHolder').notNullable();
      table
        .string('accountNo')
        .unique()
        .notNullable();
    });

exports.down = knex => knex.schema.dropTable('bank_account');
