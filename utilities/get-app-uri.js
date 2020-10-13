/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Return the APP URI
 */
const getAppURI = () => {
    return 'production' === process.env.NODE_ENV ?
        process.env.HOST :
        process.env.HOST + ':' + process.env.PORT;
};

module.exports = getAppURI;