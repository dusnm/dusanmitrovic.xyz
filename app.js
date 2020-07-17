/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Application entry point
 */

// Load environment variables
require('dotenv').config();

// Environment
const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

// Imports
const express = require('express');
const expressHandlebars = require('express-handlebars');
const handlebarsConfig = require('./config/handlebars');
const methodOverride = require('method-override');
const { dirname } = require('path');
const session = require('./config/session');
const passSessionToHandlebars = require('./middleware/session');
const notFoundHandler = require('./middleware/404-handler');
const knex = require('./db/connection');
const { Model } = require('objection');
const https = require('https');
const { readFileSync } = require('fs');

// Defined routes
const home = require('./routes/home');
const login = require('./routes/login');
const blog = require('./routes/blog');
const contact = require('./routes/contact');

const app = express();

parseInt(process.env.SERVE_STATIC_FILES_WITH_NGINX)
    ? null
    : app.use(
          '/static',
          express.static(dirname(require.main.filename) + '/static/')
      );

// Redis session
app.use(session);
app.use(passSessionToHandlebars);

// Override the HTTP methods
app.use(methodOverride('_method'));

// Database connection
Model.knex(knex);

// Configure the view engine
app.engine('hbs', expressHandlebars(handlebarsConfig));

app.set('view engine', 'hbs');
app.set('views', dirname(require.main.filename) + '/views/');

app.use(
    express.urlencoded({
        extended: true
    })
);

// Routing
app.use('/', home);
app.use('/admin', login);
app.use('/blog', blog);
app.use('/contact', contact);

// 404 route, this must always be the last route mounted
app.get(
    '*',
    (req, res, next) => {
        const error = new Error();
        error.status = 404;

        next();
    },
    notFoundHandler
);

const httpsOptions = {
    key: readFileSync(process.env.SSL_PRIVATE_KEY),
    cert: readFileSync(process.env.SSL_CERTIFICATE)
};

if ('production' === process.env.NODE_ENV) {
    httpsOptions['ca'] = readFileSync(process.env.SSL_CERTIFICATE_AUTHORITY);
}

https
    .createServer(httpsOptions, app)
    .listen(PORT, () => console.log(`Server listening on ${HOST}:${PORT}`));
