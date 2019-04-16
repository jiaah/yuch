exports.up = knex =>
  knex.schema.createTable('bank_account', table => {
    table.increments('id').primary();
    table.string('bank_name').notNullable();
    table.string('account_holder').notNullable();
    table
      .string('account_no')
      .unique()
      .notNullable();
  });

exports.down = knex => knex.schema.dropTable('bank_account');
