/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license https://opensource.org/licenses/GPL-3.0
 *
 * @summary Login Service
 */
const User = require('../models/User');
const argon2 = require('argon2');

class LoginService {
    /**
     * Log the user in
     *
     * @param {string} email
     * @param {string} password
     *
     * @return {Promise<boolean | User>}
     */
    static async login(email, password) {
        const user = await User.query()
            .select('id', 'first_name', 'last_name', 'email', 'password')
            .where('email', '=', email);

        if (undefined === user[0]) {
            return false;
        }

        if (!(await argon2.verify(user[0].password, password))) {
            return false;
        }

        return user[0];
    }
}

module.exports = LoginService;
