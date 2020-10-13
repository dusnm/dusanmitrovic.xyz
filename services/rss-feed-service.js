/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Generate an RSS2 feed
 */
const { Feed } = require('feed');
const PostService = require('../services/post-service');
const { rssFeedOptions, rssFeedPost } = require('../config/rss-feed');

class RssFeedService {
    /**
     * Generate an RSS2 feed
     *
     * @returns {Promise<string>}
     */
    static async generate() {
        const feed = new Feed(rssFeedOptions);

        const posts = await PostService.getAll();

        for (const post of posts) {
           feed.addItem(rssFeedPost(post));
        }

        return feed.rss2();
    }
}

module.exports = RssFeedService;