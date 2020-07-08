require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    seeds: {
        directory: './db/seeds'
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations'
    },
    pool: {
        min: 2,
        max: 10
    }
  },
  staging: {
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    seeds: {
        directory: './db/seeds'
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations'
    },
    pool: {
        min: 2,
        max: 10
    }
  },
  production: {
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    seeds: {
        directory: './db/seeds'
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './db/migrations'
    },
    pool: {
        min: 2,
        max: 10
    }
  }
};
