/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * HTTP routes controlling the blog
 */
const express = require('express');
const PostService = require('../services/post-service');
const authorizationMiddleware = require('../middleware/auth');
const markdown2Html = require('../utilities/markdown-2-html');
const { body, validationResult } = require('express-validator');
const moment = require('moment');
const router = express.Router();

router.get('/new', authorizationMiddleware, (req, res) => {
    return res.render('newPost', {
        title: 'New Post',
        js: ['/static/js/ui-functions.js'],
        form: {
            id: 'publish-post',
            action: `/blog`,
            heading: 'Publish Post',
            title: '',
            description: '',
            content: '',
            button: 'Publish'
        }
    });
});

router.get('/post/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostService.getById(id);

        if (undefined === post) {
            return res.render('404', {
                title: '404',
                js: ['/static/js/ui-functions.js']
            });
        }

        // Font awesome is not needed unless I'm logged in.
        const css = ['/static/css/blog-post.css'];

        if (undefined !== req.session.user) {
            css.push('/static/fontawesome-free/css/solid.min.css');
            css.push('/static/fontawesome-free/css/fontawesome.min.css');
        }

        return res.render('blogPost', {
            title: post.title,
            css,
            js: ['/static/js/ui-functions.js'],
            id: post.id,
            content: markdown2Html(post.content),
            openGraph: {
                title: post.title,
                type: 'article',
                url: `${process.env.HOST}/blog/post/${post.id}`,
                description: post.description
            }
        });
    } catch (error) {
        console.error(error);
        return res.end();
    }
});

router.get('/edit/:id', authorizationMiddleware, async (req, res) => {
    const id = req.params.id;

    const post = await PostService.getById(id);

    if (undefined === post) {
        return res.render('404', {
            title: '404',
            js: ['/static/js/ui-functions.js']
        });
    }

    return res.render('editPost', {
        title: 'Edit Post',
        js: ['/static/js/ui-functions.js'],
        form: {
            id: 'edit-post',
            action: `/blog/${id}?_method=PUT`,
            heading: 'Edit Post',
            error: {},
            title: post.title,
            description: post.description,
            content: post.content,
            button: 'Edit'
        }
    });
});

router.get('/', async (req, res) => {
    try {
        const page = req.query.page ? req.query.page : 1;
        const perPage = req.query.perPage ? req.query.perPage : 4;

        const paginatedPosts = await PostService.getPaginated(page, perPage);

        for (post of paginatedPosts.posts) {
            post.created_at = moment(post.created_at).format('DD-MM-YYYY');
        }

        return res.render('blogPage', {
            title: 'Blog',
            css: ['/static/css/blog-post.css'],
            js: ['/static/js/ui-functions.js'],
            posts: paginatedPosts.posts,
            totalPages: paginatedPosts.totalPages,
            page,
            previousPage: parseInt(page) - 1,
            nextPage: parseInt(page) + 1,
            perPage
        });
    } catch (error) {
        console.error(error);
    }
});

router.post(
    '/',
    authorizationMiddleware,
    [
        body('title')
            .notEmpty()
            .isLength({ max: 100 }),
        body('description')
            .notEmpty()
            .isLength({ max: 300 }),
        body('content').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            const { title, description, content } = req.body;
            const user_id = req.session.user.id;

            if (!errors.isEmpty()) {
                const errorsArray = errors.array();

                return res.status(422).render('newPost', {
                    title: 'New Post',
                    js: ['/static/js/ui-functions.js'],
                    form: {
                        id: 'publish-post',
                        action: `/blog`,
                        heading: 'Publish Post',
                        error: {
                            message: `${errorsArray[0].msg} ${errorsArray[0].param}`
                        },
                        title,
                        description,
                        content,
                        button: 'Publish'
                    }
                });
            }

            await PostService.create(title, description, content, user_id);

            return res.redirect('/blog');
        } catch (error) {
            console.error(error);
            return res.end();
        }
    }
);

router.put(
    '/:id',
    authorizationMiddleware,
    [
        body('title')
            .notEmpty()
            .isLength({ max: 100 }),
        body('description')
            .notEmpty()
            .isLength({ max: 300 }),
        body('content').notEmpty()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            const { title, description, content } = req.body;
            const id = req.params.id;
            const user_id = req.session.user.id;

            if (!errors.isEmpty()) {
                const errorsArray = errors.array();

                return res.status(422).render('editPost', {
                    title: 'Edit Post',
                    js: ['/static/js/ui-functions.js'],
                    form: {
                        id: 'edit-post',
                        action: `/blog/${id}?_method=PUT`,
                        heading: 'Edit Post',
                        error: {
                            message: `${errorsArray[0].msg} ${errorsArray[0].param}`
                        },
                        title,
                        description,
                        content,
                        button: 'Edit'
                    }
                });
            }

            await PostService.update(title, description, content, user_id, id);

            return res.redirect('/blog/post/' + id);
        } catch (error) {
            console.error(error);
            return res.end();
        }
    }
);

router.delete('/post/:id', authorizationMiddleware, async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.session.user.id;

        await PostService.delete(id, user_id);

        return res.redirect('/blog');
    } catch (error) {
        console.error(error);
        return res.end();
    }
});

module.exports = router;
