/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license https://opensource.org/licenses/GPL-3.0
 *
 * @summary Post model
 */
const { Model } = require('objection');

class Post extends Model {
    static get tableName() {
        return 'posts';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['title', 'description', 'content', 'user_id'],
            properties: {
                id: {
                    type: 'integer'
                },
                title: {
                    type: 'string',
                    minLegth: 1,
                    maxLength: 100
                },
                description: {
                    type: 'string',
                    minLegth: 1,
                    maxLength: 300
                },
                content: {
                    type: 'string',
                    minLegth: 1
                },
                user_id: {
                    type: 'integer'
                }
            }
        };
    }

    static get relationMappings() {
        const User = require('./User');

        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'posts.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Post;
