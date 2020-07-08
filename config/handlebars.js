/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Handlebars view engine configuration
 */
const { dirname } = require('path');
const compareHandlebarsHelper = require('../views/helpers/compare');

const handlebarsConfig = {
    extname: 'hbs',
    defaultLayout: 'main',
    partialsDir: dirname(require.main.filename) + '/views/partials/',
    layoutsDir: dirname(require.main.filename) + '/views/layouts/',
    helpers: {
        compare: compareHandlebarsHelper
    }
};

module.exports = handlebarsConfig;
