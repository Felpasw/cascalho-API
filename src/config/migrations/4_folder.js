exports.up = function (knex) {
    return knex.schema.createTable('folder', function (table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('user.id');
    table.string('name').notNullable();
    table.timestamps(true, true);
    table.datetime('deleted_at').defaultTo(null);
  })
}
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('folder');
  };