const argon2 = require('argon2');

exports.seed = async function(knex) {
    const passwordHash = await argon2.hash(process.env.ADMIN_PASSWORD, {
        type: argon2.argon2id,
        hashLength: 60
    });
    // Deletes ALL existing entries
    return knex('users')
        .del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                {
                    first_name: process.env.ADMIN_FIRST_NAME,
                    last_name: process.env.ADMIN_LAST_NAME,
                    email: process.env.ADMIN_EMAIL,
                    password: passwordHash
                }
            ]);
        });
};
