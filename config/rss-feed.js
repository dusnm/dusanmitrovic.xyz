/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary RSS Feed configuration
 */
const getAppURI = require('../utilities/get-app-uri');
const markdown2Html = require('../utilities/markdown-2-html');

const rssFeedOptions = {
    title: 'Dušan\'s blog',
    description: 'An RSS feed of my personal blog.',
    id: getAppURI(),
    link: getAppURI() + '/rss',
    language: 'en',
    image: getAppURI() + '/static/images/me_alternate.jpg',
    favicon: getAppURI() + '/static/images/favicon.png',
    copyright: `${new Date().getFullYear()} All rights reversed.`,
    feedLinks: {
        atom: getAppURI() + '/rss'
    },
    author: {
        name: 'Dušan Mitrović',
        email: 'dusan@dusanmitrovic.xyz',
        link: getAppURI()
    }
};

const rssFeedPost = (post) => ({
    id: `${getAppURI()}/blog/post/${post.id}`,
    title: post.title,
    description: post.description,
    link: `${getAppURI()}/blog/post/${post.id}`,
    content: markdown2Html(post.content),
    author: [
        {
            name: `${post.first_name} ${post.last_name}`,
            email: post.email,
            link: getAppURI()
        }
    ],
    date: post.created_at,
});

module.exports = {
    rssFeedOptions,
    rssFeedPost,
};