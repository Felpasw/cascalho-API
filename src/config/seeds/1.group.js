exports.seed = async function (knex) {
  return await knex('group').insert([
    {
      name: 'Administração',
      image: 'therock.png',
      screen_id: 1
    },
    {
      name: 'Usuários',
      image: 'NerdImage.png',
      screen_id: 2
    }
  ])
}
