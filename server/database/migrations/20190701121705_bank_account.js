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
      table.timestamps(true, true);
      // table
      //   .timestamps('createdAt', { useTz: true })
      //   .notNullable()
      //   .defaultTo(knex.raw('now()'));
      // table
      //   .timestamp('updatedAt', { useTz: true })
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable('bank_account');
