exports.up = function (knex) {
  return knex.schema.createTable('group', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.integer('screen_id').unsigned()
    table.foreign('screen_id').references('screen.id')
    table.string('image').notNullable()
    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('group')
}
