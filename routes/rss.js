/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary RSS Feed routes
 */
const express = require('express');
const router = express.Router();
const RssFeedService = require('../services/rss-feed-service');

router.get('/', async (req, res) => {
    try {
        return res
            .contentType('application/rss+xml')
            .send(await RssFeedService.generate());
    } catch(err) {
        console.error(err);
        return res.end();
    }
});

module.exports = router;
