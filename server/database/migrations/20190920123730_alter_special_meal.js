exports.up = knex =>
  knex.schema.alterTable('special_meal', table => {
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('RESTRICT')
      .defaultTo(null)
      .index();
  });

exports.down = knex =>
  knex.schema.table('special_meal', table => {
    table.dropColumn('userId');
  });
