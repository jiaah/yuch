require('dotenv').config();

const {
  PG_USER,
  PG_HOST,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
  DATABASE_URL,
} = process.env;

module.exports = {
  development: {
    client: 'pg',
    debug: true,
    connection: {
      user: PG_USER,
      host: PG_HOST,
      database: PG_DATABASE,
      password: PG_PASSWORD,
      port: PG_PORT,
      timezone: 'ASIA/SEOUL',
    },
    // `postgres://localhost:${PG_PORT}/${PG_DATABASE}`
    migrations: {
      directory: `${__dirname}/server/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/database/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: DATABASE_URL,
    pool: {
      min: 2,
      max: 50,
    },
    migrations: {
      directory: `${__dirname}/server/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/database/seeds`,
    },
  },
};
