const knex = require('knex');
const mockKnex = require('mock-knex');

const connection = knex({ client: 'pg', debug: false });
mockKnex.mock(connection, 'knex@0.10');

module.exports = connection;
