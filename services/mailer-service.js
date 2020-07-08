/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license https://opensource.org/licenses/GPL-3.0
 *
 * @summary Mailer Service
 */
const nodemailer = require('nodemailer');
const transporterOptions = require('../config/nodemailer');

const transporter = nodemailer.createTransport(transporterOptions);

class MailerService {
    /**
     * Send an email
     *
     * @param {string} name
     * @param {string} email
     * @param {string} subject
     * @param {string} message
     *
     * @returns {Promise<Object>}
     */
    static async send(name, email, subject, message) {
        return transporter.sendMail({
            from: process.env.MAILER_USERNAME,
            to: process.env.MAILER_USERNAME,
            subject,
            html: `<p>New message from: ${name} &lt;${email}&gt;</p>
                   <p>Subject: ${subject}</p>
                   <p>Message: ${message}</p>`
        });
    }
}

module.exports = MailerService;
