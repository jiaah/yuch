exports.up = knex =>
  knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('users', table => {
      table
        .uuid('id')
        .primary()
        .notNullable()
        .defaultTo(knex.raw('uuid_generate_v4()'));
      table
        .string('companyName')
        .unique()
        .notNullable();
      table
        .string('username')
        .unique()
        .notNullable();
      table.string('password').notNullable();
      table.string('contactNo').notNullable();
      table.string('email');
      table
        .boolean('isAdmin')
        .notNullable()
        .defaultTo(false);
      table.integer('mealPrice');
      table.integer('lunchQty');
      table.integer('dinnerQty');
      table
        .integer('bankAccountId')
        .references('id')
        .inTable('bankAccount')
        .index()
        .defaultTo(1);
      table.timestamps(true, true);
      // table
      //   .timestamps('createdAt', { useTz: true })
      //   .notNullable()
      //   .defaultTo(knex.raw('now()'));
      // table
      //   .timestamp('updatedAt', { useTz: true })
      //   .notNullable()
      //   .defaultTo(knex.fn.now());
    });

exports.down = knex => knex.schema.dropTable('users');
