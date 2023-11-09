const Joi = require('joi')

const object = Joi.object().keys({
  folderId: Joi.number().label('Pasta'),
  userId: Joi.number().required().label('Usuário'),
  name: Joi.string().label('Name')
})

module.exports = { object }
