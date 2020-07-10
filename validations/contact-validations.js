/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary validations for the contact feature
 */
const { body } = require('express-validator');

const validations = {
    contact: [
        body('name')
            .notEmpty()
            .withMessage('is required.')
            .escape(),
        body('email')
            .isEmail()
            .withMessage('must be a valid email address.')
            .notEmpty()
            .withMessage('is required.')
            .escape(),
        body('subject')
            .notEmpty()
            .withMessage('is required.')
            .escape(),
        body('message')
            .notEmpty()
            .withMessage('is required.')
            .escape()
    ]
};

module.exports = validations;
