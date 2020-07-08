/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary User model
 */
const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['first_name', 'last_name', 'email', 'password'],
            properties: {
                id: {
                    type: 'integer'
                },
                first_name: {
                    type: 'string',
                    minLegth: 1,
                    maxLength: 100
                },
                last_name: {
                    type: 'string',
                    minLegth: 1,
                    maxLength: 100
                },
                email: {
                    type: 'string',
                    maxLength: 100,
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLegth: 8,
                    maxLength: 100
                }
            }
        };
    }

    static get relationMappings() {
        const Post = require('./Post');

        return {
            posts: {
                relation: Model.HasManyRelation,
                modelClass: Post,
                join: {
                    from: 'users.id',
                    to: 'posts.user_id'
                }
            }
        };
    }
}

module.exports = User;
