/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * HTTP routes for the contact page
 */
const express = require('express');
const validations = require('../validations/contact-validations');
const { validationResult } = require('express-validator');
const capitalize = require('../utilities/capitalize');
const MailerService = require('../services/mailer-service');

const router = express.Router();

router.get('/', (req, res) => {
    return res.render('contact', {
        title: 'Contact',
        css: [
            '/static/css/contact.css',
        ],
        form: {
            id: 'contact-form',
            action: '/contact',
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });
});

router.post('/', validations.contact, async (req, res) => {
    const { name, email, subject, message } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();

        return res.status(422).render('contact', {
            title: 'Contact',
            css: [
                '/static/css/contact.css',
            ],
            form: {
                id: 'contact-form',
                action: '/contact',
                error: {
                    message: `${capitalize(errorsArray[0].param)} ${
                        errorsArray[0].msg
                    }`
                },
                success: {},
                name,
                email,
                subject,
                message
            }
        });
    }

    const messageResponse = await MailerService.send(
        name,
        email,
        subject,
        message
    );

    const success = {};
    const error = {};

    if (messageResponse.rejected.length > 0) {
        error.message = 'There was a problem sendig this message.';
    }

    if (messageResponse.accepted.length > 0) {
        success.message = 'Message sent successfully.';
    }

    return res.render('contact', {
        title: 'Contact',
        css: [
            '/static/css/contact.css',
        ],
        form: {
            id: 'contact-form',
            action: '/contact',
            error,
            success,
            name: '',
            email: '',
            subject: '',
            message: ''
        }
    });
});

module.exports = router;
