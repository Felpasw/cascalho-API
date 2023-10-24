
exports.up = function (knex) {
  return knex.schema.createTable('publication', function (table) {
    table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('user.id');
      table.integer('category_id').unsigned().notNullable();
      table.foreign('category_id').references('category.id');
      table.integer('document_id').unsigned();
      table.foreign('document_id').references('document.id');
      table.string('description').notNullable();
      table.timestamps(true, true);
      table.datetime('deleted_at').defaultTo(null);
  })

};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('publication');
};