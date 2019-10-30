exports.up = knex =>
  knex.schema.alterTable('users', table => {
    table
      .uuid('id')
      .unique()
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .alter();
  });

exports.down = knex =>
  knex.schema.table('users', table => {
    table.dropColumn('id').alter();
  });
