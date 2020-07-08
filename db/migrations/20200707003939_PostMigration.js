exports.up = function(knex) {
    return knex.schema.createTable('posts', table => {
        table.increments('id');
        table.string('title', 100).notNullable();
        table.string('description', 300).notNullable();
        table.text('content', 'longtext').notNullable();
        table
            .integer('user_id')
            .unsigned()
            .notNullable();
        table.timestamps(true);

        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};
