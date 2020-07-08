/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Nodemailer configuration
 */
const transporterOptions = {
    port: process.env.MAILER_PORT,
    host: process.env.MAILER_HOST,
    auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD
    },
    secure: process.env.MAILER_SECURE
};

module.exports = transporterOptions;
