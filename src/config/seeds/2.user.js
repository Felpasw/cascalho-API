exports.seed = async function (knex) {
  return await knex('user').insert([
    {
      group_id: 1,
      name: 'Felipe adm',
      email: 'felipe@adm.com',
      password: '$2b$10$Q7X4C.ub/M62CUwj25femeja.oPg1Ro8xGv61uhgLBxKpJeNNxj2u'
    },
    {
      group_id: 2,
      name: 'Felipe',
      email: 'felipe@usuario.com',
      password: '$2b$10$Q7X4C.ub/M62CUwj25femeja.oPg1Ro8xGv61uhgLBxKpJeNNxj2u'
    }
  ])
}
