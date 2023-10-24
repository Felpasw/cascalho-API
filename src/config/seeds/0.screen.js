exports.seed = async function (knex) {
  return await knex('screen').insert([
    {
      route: '/dashboard'
    },
    {
      route: '/home'
    }
  ])
}
