exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('partners', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('companyName');
      table.string('accountHolder');
      table.string('bankName');
      table
        .string('accountNo')
        .unique()
        .notNullable();
      table.string('contactNo');
      table.timestamps(true, true);
    });

exports.down = knex => knex.schema.dropTable('partners');
