exports.up = function (knex) {
  return knex.schema.createTable('screen', function (table) {
    table.increments('id').primary()
    table.string('route')
    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('screen')
}
