
exports.up = function (knex) {

return  knex.schema.createTable('document', function (table) {
    table.increments('id').primary();
    table.integer('version').notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('user.id');
    table.integer('folder_id').unsigned();
    table.foreign('folder_id').references('folder.id');
    table.integer('archive_id').unsigned();
    table.foreign('archive_id').references('archive.id');
    table.timestamps(true, true);
    table.datetime('deleted_at').defaultTo(null);
    })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('document');
  };
