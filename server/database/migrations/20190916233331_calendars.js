exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('calendars', table => {
      table
        .date('date')
        .primary()
        .notNullable();
    });

exports.down = knex => knex.schema.dropTable('calendars');
