/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Database connection configuration
 */
const Knex = require('knex');

const knex = Knex({
    client: process.env.DB_DRIVER,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    pool: {
        min: 2,
        max: 10
    }
});

module.exports = knex;
