exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('partners', table => {
      table
        .uuid('id')
        .primary()
        .unique()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('companyName')
        .unique()
        .defaultTo('');
      table.string('accountHolder').defaultTo('');
      table.string('bankName').defaultTo('');
      table.string('accountNo').defaultTo('');
      table.string('contactNo').defaultTo('');
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('partners');
