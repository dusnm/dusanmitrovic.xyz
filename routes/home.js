/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary HTTP routes for the main page
 */
const express = require('express');
const moment = require('moment');
const homeViewData = require('../views/view-data/home');
const PostService = require('../services/post-service');
const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await PostService.getTopX();

    for (post of posts) {
        post.created_at = moment(post.created_at).format('DD-MM-YYYY');
    }

    return res.render('home', {
        ...homeViewData,
        posts
    });
});

module.exports = router;
