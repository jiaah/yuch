exports.up = knex =>
  knex.schema.alterTable('partners', table => {
    table
      .string('companyName')
      .unique()
      .defaultTo('')
      .alter();
    table
      .string('accountHolder')
      .defaultTo('')
      .alter();
    table
      .string('bankName')
      .defaultTo('')
      .alter();
    table
      .string('contactNo')
      .defaultTo('')
      .alter();
  });

exports.down = knex =>
  knex.schema.table('partners', table => {
    table.string('companyName').alter();
    table.string('accountHolder').alter();
    table.string('bankName').alter();
    table.string('contactNo').alter();
  });
