/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary HTTP routes for login/logout
 */
const express = require('express');
const validations = require('../validations/login-validations');
const { validationResult } = require('express-validator');
const capitalize = require('../utilities/capitalize');
const authorizationMiddleware = require('../middleware/auth');
const LoginService = require('../services/login-service');

const router = express.Router();

router.get('/login', (req, res) => {
    if (undefined !== req.session.user) {
        return res.redirect('/');
    }

    return res.render('login', {
        title: 'Login'
    });
});

router.post('/login', validations.login, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorsArray = errors.array();

            return res.status(422).render('login', {
                title: 'Login',
                error: {
                    message: `${capitalize(errorsArray[0].param)} ${
                        errorsArray[0].msg
                    }`
                }
            });
        }

        const { email, password } = req.body;

        const user = await LoginService.login(email, password);

        if (!user) {
            return res.status(401).render('login', {
                title: 'Login',
                error: {
                    message: 'Wrong email or password.'
                }
            });
        }

        req.session.user = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };

        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.end();
    }
});

router.get('/logout', authorizationMiddleware, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
        }
    });

    return res.redirect('/');
});

module.exports = router;
