exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('image')
    table.string('password').notNullable()
    table.integer('group_id').unsigned()
    table.foreign('group_id').references('group.id')
    table.timestamps(true, true)
    table.datetime('deleted_at').defaultTo(null)
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user')
}
