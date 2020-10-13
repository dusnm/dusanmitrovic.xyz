/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Generate an RSS2 feed
 */
const { Feed } = require('feed');
const PostService = require('../services/post-service');
const markdown2Html = require('../utilities/markdown-2-html');
const getAppURI = require('../utilities/get-app-uri');

class RssFeedService {
    /**
     * Generate an RSS2 feed
     *
     * @returns {Promise<string>}
     */
    static async generate() {
        const feed = new Feed({
            title: 'Dušan\'s RSS feed.',
            description: 'An RSS feed of my personal technology blog.',
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
        });

        const posts = await PostService.getAll();

        for (const post of posts) {
           feed.addItem({
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
        }

        return feed.rss2();
    }
}

module.exports = RssFeedService;