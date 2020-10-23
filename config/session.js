/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Application session configuration
 */
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./redis');

const redisSession = {
    store: new RedisStore({
        client: redisClient
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
        secure: true    
    }
};

module.exports = session(redisSession);
