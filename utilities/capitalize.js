/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Function that capitalizes the first character of the string
 */

/**
 * Capitalize the first character of the string
 *
 * @param {string} str
 *
 * @returns {string}
 */
const capitalize = str => {
    if ('string' !== typeof str) {
        return '';
    }

    return str.replace(/^\w/, character => character.toUpperCase());
};

module.exports = capitalize;
