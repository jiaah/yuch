const { PG_USER, PG_HOST, PG_DATABASE, PG_PASSWORD, PG_PORT } = process.env;
// PG_USER = postgres;
// PG_HOST = localhost;
// PG_DATABASE = yuchdb;
// PG_PORT = 5432;

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT,
    },
    migrations: {
      directory: `${__dirname}/server/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/database/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: {
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT,
    },
    migrations: {
      directory: `${__dirname}/server/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/database/seeds`,
    },
  },
};
