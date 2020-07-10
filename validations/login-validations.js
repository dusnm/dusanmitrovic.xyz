/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary validations for the login feature
 */
const { body } = require('express-validator');

const validations = {
    login: [
        body('email')
            .isEmail()
            .withMessage('must be a valid email address.'),
        body('password')
            .notEmpty()
            .withMessage('is required.')
    ]
};

module.exports = validations;
