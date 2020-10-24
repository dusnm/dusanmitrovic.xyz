/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary HTTP routes controlling the blog
 */
const express = require('express');
const PostService = require('../services/post-service');
const authorizationMiddleware = require('../middleware/auth');
const markdown2Html = require('../utilities/markdown-2-html');
const validations = require('../validations/post-validations');
const {validationResult} = require('express-validator');
const capitalize = require('../utilities/capitalize');
const moment = require('moment');
const router = express.Router();

router.get('/new', authorizationMiddleware, (req, res) => {
    return res.render('newPost', {
        title: 'New Post',
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
                title: 'Page Not Found'
            });
        }

        // Font awesome is not needed unless I'm logged in.
        const css = ['/static/css/prism.css', '/static/css/blog-post.css'];

        if (undefined !== req.session.user) {
            css.push('/static/fontawesome-free/css/solid.min.css');
            css.push('/static/fontawesome-free/css/fontawesome.min.css');
        }

        return res.render('blogPost', {
            title: post.title,
            css,
            js: ['/static/js/prism.js'],
            id: post.id,
            content: markdown2Html(post.content),
            created_at: moment(post.created_at).format('MMMM Do YYYY'),
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
            title: 'Page Not Found'
        });
    }

    return res.render('editPost', {
        title: 'Edit Post',
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

router.get('/', validations.getPaginatedPosts, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(404).render('404', {
                title: 'Page Not Found'
            });
        }

        const page = req.query.page ? req.query.page : 1;
        const perPage = req.query.perPage ? req.query.perPage : 4;

        const paginatedPosts = await PostService.getPaginated(page, perPage);

        for (post of paginatedPosts.posts) {
            post.created_at = moment(post.created_at, 'YYYYMMDD').fromNow();
        }

        return res.render('blogPage', {
            title: 'Blog',
            css: ['/static/css/blog-post.css'],
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
    validations.createAndUpdatePost,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            const {title, description, content} = req.body;
            const user_id = req.session.user.id;

            if (!errors.isEmpty()) {
                const errorsArray = errors.array();

                return res.status(422).render('newPost', {
                    title: 'New Post',
                    form: {
                        id: 'publish-post',
                        action: `/blog`,
                        heading: 'Publish Post',
                        error: {
                            message: `${capitalize(errorsArray[0].param)} ${
                                errorsArray[0].msg
                            }`
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
    validations.createAndUpdatePost,
    async (req, res) => {
        try {
            const errors = validationResult(req);
            const {title, description, content} = req.body;
            const id = req.params.id;
            const user_id = req.session.user.id;

            if (!errors.isEmpty()) {
                const errorsArray = errors.array();

                return res.status(422).render('editPost', {
                    title: 'Edit Post',
                    form: {
                        id: 'edit-post',
                        action: `/blog/${id}?_method=PUT`,
                        heading: 'Edit Post',
                        error: {
                            message: `${capitalize(errorsArray[0].param)} ${
                                errorsArray[0].msg
                            }`
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
