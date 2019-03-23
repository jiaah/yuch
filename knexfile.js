const { user, host, database, password, port } = require('./secrets/db_config');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      port,
      host,
      database,
      user,
      password,
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
      port,
      host,
      database,
      user,
      password,
    },
    migrations: {
      directory: `${__dirname}/server/database/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/database/seeds`,
    },
  },
};
