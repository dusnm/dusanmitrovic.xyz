/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Authorization middleware
 */
const authorizationMiddleware = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.redirect('/');
    }

    next();
};

module.exports = authorizationMiddleware;
