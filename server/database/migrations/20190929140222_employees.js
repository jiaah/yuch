exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('employees', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('name')
        .unique()
        .notNullable();
      table.string('accountHolder').defaultTo('');
      table.string('bankName').defaultTo('');
      table
        .string('accountNo')
        .unique()
        .notNullable();
      table.string('contactNo').defaultTo('');
      table.string('address').defaultTo('');
      table.string('startedAt').defaultTo('');
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('employees');
