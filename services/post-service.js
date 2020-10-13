/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license https://opensource.org/licenses/GPL-3.0
 *
 * @summary Post Service
 */
const Post = require('../models/Post');

class PostService {
    /**
     * Return a single post by id
     *
     * @param {number} id
     *
     * @returns {Promise<Post>}
     */
    static async getById(id) {
        return Post.query()
            .select('id', 'title', 'description', 'content')
            .findById(id);
    }

    /**
     * Return all posts
     *
     * @returns {Promise<Post[]>}
     */
    static async getAll() {
        return Post.query()
            .select(
                'posts.id',
                'posts.title',
                'posts.description',
                'posts.content',
                'posts.created_at',
                'user.first_name',
                'user.last_name',
                'user.email'
            )
            .leftJoinRelated('user')
            .orderBy('posts.created_at', 'DESC');
    }

    /**
     * @typedef {Object} PaginatedPosts
     * @property {Array<Post>} posts
     * @property {number} totalPages
     */

    /**
     * Get a collection of paginated posts
     *
     * @param {number} page
     * @param {number} perPage
     *
     * @returns {Promise<PaginatedPosts>}
     */
    static async getPaginated(page = 1, perPage = 4) {
        const postsCount = await Post.query().count('*', { as: 'count' });
        const posts = await Post.query()
            .select(
                'posts.id',
                'posts.title',
                'posts.description',
                'posts.created_at',
                'user.first_name',
                'user.last_name'
            )
            .leftJoinRelated('user')
            .orderBy('posts.created_at', 'DESC')
            .offset((page - 1) * perPage)
            .limit(perPage);

        return {
            posts,
            totalPages: Math.ceil(postsCount[0].count / perPage)
        };
    }

    /**
     * Add a new post to the database
     *
     * @param {string} title
     * @param {string} description
     * @param {string} content
     * @param {number} user_id
     *
     * @returns {Promise<Post>}
     */
    static async create(title, description, content, user_id) {
        return Post.query().insert({
            title,
            description,
            content,
            user_id
        });
    }

    /**
     * Update a post in the database
     *
     * @param {string} title
     * @param {string} description
     * @param {string} content
     * @param {number} id
     * @param {number} user_id
     *
     * @returns {Promise<number>}
     */
    static async update(title, description, content, user_id, id) {
        return Post.query()
            .patch({
                title,
                description,
                content,
                user_id
            })
            .where('id', '=', id)
            .andWhere('user_id', '=', user_id);
    }

    /**
     * Delete a post from the database
     *
     * @param {number} id
     * @param {number} user_id
     *
     * @returns {Promise<number>}]
     */
    static async delete(id, user_id) {
        return Post.query()
            .delete()
            .where('id', '=', id)
            .andWhere('user_id', '=', user_id);
    }
}

module.exports = PostService;
