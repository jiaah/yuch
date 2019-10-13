exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('employees', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('name')
        .unique()
        .defaultTo('');
      table.string('accountHolder').defaultTo('');
      table.string('bankName').defaultTo('');
      table.string('accountNo').defaultTo('');
      table.string('contactNo').defaultTo('');
      table.string('address').defaultTo('');
      table.string('startDate').defaultTo('');
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('employees');
