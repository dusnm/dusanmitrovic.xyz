/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary HTTP routes for the main page
 */
const express = require('express');
const homeViewData = require('../views/view-data/home');
const router = express.Router();

router.get('/', async (req, res) => {
    return res.render('home', {
        ...homeViewData,
    });
});

module.exports = router;
