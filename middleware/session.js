/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Session middleware
 */
const passSessionToHandlebars = (req, res, next) => {
    res.locals.session = req.session;
    next();
};

module.exports = passSessionToHandlebars;

