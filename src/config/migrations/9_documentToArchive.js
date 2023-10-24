
exports.up = function (knex) {
    return  knex.schema.createTable('documenttoarchive', function (table) {
        table.increments('id').primary();
        table.integer('archive_id').unsigned();
        table.foreign('archive_id').references('archive.id');
        table.integer('document_id').unsigned();
        table.foreign('document_id').references('document.id');

        table.timestamps(true, true);
        table.datetime('deleted_at').defaultTo(null);
        })
    }
    
    exports.down = function (knex) {
        return knex.schema.dropTableIfExists('documentToArchive');
      };
    