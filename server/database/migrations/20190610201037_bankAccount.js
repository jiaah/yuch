exports.up = knex =>
  knex.schema.createTable('bankAccount', table => {
    table.increments('id').primary();
    table.string('bankName').notNullable();
    table.string('accountHolder').notNullable();
    table
      .string('accountNo')
      .unique()
      .notNullable();
  });

exports.down = knex => knex.schema.dropTable('bankAccount');
