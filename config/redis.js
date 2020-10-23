/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Redis configuration
 */
const redis = require('redis');

const redisClient = redis.createClient();

module.exports = redisClient;