/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary A comparison helper for handlebars
 */

/**
 * Compares the two values with a given operator
 *
 * @param {string} value1
 * @param {string} operator
 * @param {string} value2
 *
 * @throws {Error}
 *
 * @returns {boolean}
 */
const compareHandlebarsHelper = (comparant1, operator, comparant2) => {
    const value1 = parseFloat(comparant1);
    const value2 = parseFloat(comparant2);

    switch (operator) {
        case '<':
            return value1 < value2;
        case '<=':
            return value1 <= value2;
        case '>':
            return value1 > value2;
        case '>=':
            return value1 >= value2;
        case '==':
            return value1 == value2;
        case '===':
            return value1 === value2;
        case '!=':
            return value1 != value2;
        case '!==':
            return value1 !== value2;
        default:
            throw new Error('Invalid comparison operator: ' + operator);
    }
};

module.exports = compareHandlebarsHelper;
