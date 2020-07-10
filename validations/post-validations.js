/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary validations for the Post model
 */
const { body, query } = require('express-validator');

const validations = {
    getPaginatedPosts: [
        query('page')
            .optional()
            .isNumeric()
            .withMessage('must be numeric'),
        query('perPage')
            .optional()
            .isNumeric()
            .withMessage('must be numeric')
    ],
    createAndUpdatePost: [
        body('title')
            .notEmpty()
            .withMessage('is required.')
            .isLength({ max: 100 })
            .withMessage('can not be longer than 100 characters.'),
        body('description')
            .notEmpty()
            .withMessage('is required.')
            .isLength({ max: 300 })
            .withMessage('can not be longer than 300 characters.'),
        body('content')
            .notEmpty()
            .withMessage('is required.')
    ]
};

module.exports = validations;
