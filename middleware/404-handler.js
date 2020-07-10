/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary A middleware that handles all 404 errors
 */
const notFoundHandler = (req, res, next) => {
    res.status(404).render('404', {
        title: 'Page Not Found'
    });
};

module.exports = notFoundHandler;
