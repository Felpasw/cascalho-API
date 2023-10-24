exports.up = function (knex) {
    return knex.schema.createTable('comment', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user.id');
    table.integer('publication_id').unsigned().notNullable();
    table.foreign('publication_id').references('publication.id');
    table.string('content').notNullable();
    table.timestamps(true, true);
    table.datetime('deleted_at').defaultTo(null);
  })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('comment');
  };