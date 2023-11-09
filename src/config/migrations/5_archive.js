exports.up = function (knex) {
  return knex.schema.createTable('archive', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('archive')
}
