exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('first_name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('email', 100).notNullable();
        table.string('password', 200).notNullable();
        table.timestamps(true);

        table.unique(['email']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
