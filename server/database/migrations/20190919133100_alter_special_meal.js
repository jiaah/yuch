exports.up = knex =>
  knex.schema.alterTable('special_meal', table => {
    table.string('companyName');
    table.string('contactNo');
    table.string('address');
    table.integer('quantity').defaultTo(0);
    table.integer('sumTotal').defaultTo(0);
    table.dropColumn('userId');
  });

exports.down = knex =>
  knex.schema.table('special_meal', table => {
    table.dropColumn('companyName');
    table.dropColumn('contactNo');
    table.dropColumn('address');
    table.dropColumn('quantity');
    table.dropColumn('sumTotal');
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('RESTRICT')
      .index();
  });
