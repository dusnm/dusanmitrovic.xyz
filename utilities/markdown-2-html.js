/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Convert and sanitize markdown to HTML
 */
const marked = require('marked');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * Convert and sanitize markdown to HTML
 *
 * @param {string} markdown
 *
 * @returns {string}
 */
const markdown2Html = markdown => {
    const dirtyHTML = marked(markdown);
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);

    return cleanHTML;
};

module.exports = markdown2Html;
